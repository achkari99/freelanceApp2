import { NextResponse } from "next/server";
import { chatKnowledgeBase } from "@/lib/chat-knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_MODEL = "gpt-oss:20b-cloud";

type Role = "system" | "user" | "assistant";

interface IncomingMessage {
  role: Role;
  content: string;
}

interface ChatProxyPayload {
  system?: string;
  messages: IncomingMessage[];
}

export async function POST(request: Request) {
  let body: ChatProxyPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!body?.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: "Chat messages are required" }, { status: 400 });
  }

  const key = process.env.OLLAMA_KEY || process.env.OLLAMA_API_KEY || process.env.OLLAMA_TOKEN;
  const baseUrl = (process.env.OLLAMA_BASE_URL || "http://localhost:11434").replace(/\/+$/, "");
  const endpoint = `${baseUrl}/api/chat`;

  const systemContent = [body.system?.trim(), chatKnowledgeBase].filter(Boolean).join("\n\n---\n\n");

  const upstreamPayload = {
    model: DEFAULT_MODEL,
    stream: true,
    messages: [
      { role: "system" as const, content: systemContent },
      ...body.messages.map((message) => ({
        role: sanitizeRole(message.role),
        content: message.content?.slice(0, 4_096) ?? ""
      }))
    ].filter(Boolean)
  };

  let upstreamResponse: Response;

  try {
    upstreamResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(key ? { Authorization: `Bearer ${key}` } : {})
      },
      body: JSON.stringify(upstreamPayload),
      cache: "no-store"
    });
  } catch (error) {
    console.error("Failed to reach Ollama service", error);
    return NextResponse.json({ error: "Unable to reach Ollama service" }, { status: 502 });
  }

  if (!upstreamResponse.ok || !upstreamResponse.body) {
    const fallback = await safeParseJson(upstreamResponse);
    const message =
      (fallback &&
        typeof fallback === "object" &&
        fallback !== null &&
        "error" in fallback &&
        typeof (fallback as { error: unknown }).error === "string" &&
        (fallback as { error: string }).error) ||
      (typeof fallback === "string" ? fallback : null) ||
      upstreamResponse.statusText ||
      "Ollama request failed";
    return NextResponse.json({ error: message }, { status: upstreamResponse.status || 502 });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstreamResponse.body?.getReader();
      if (!reader) {
        controller.error(new Error("Unable to read upstream response"));
        return;
      }

      let buffer = "";
      let hasErrored = false;

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });

          buffer = drainBuffer(buffer, (chunk) => {
            controller.enqueue(encoder.encode(chunk));
          });
        }

        if (buffer.trim().length > 0) {
          drainBuffer(`${buffer}\n`, (chunk) => {
            controller.enqueue(encoder.encode(chunk));
          });
        }
      } catch (error) {
        hasErrored = true;
        controller.error(error);
      } finally {
        reader.releaseLock();
        if (!hasErrored) {
          controller.close();
        }
      }
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function sanitizeRole(role: string): Role {
  if (role === "assistant" || role === "system" || role === "user") {
    return role;
  }
  return "user";
}

function drainBuffer(buffer: string, emit: (chunk: string) => void) {
  let working = buffer;
  let newlineIndex = working.indexOf("\n");

  while (newlineIndex !== -1) {
    const line = working.slice(0, newlineIndex).trim();
    working = working.slice(newlineIndex + 1);

    if (line) {
      try {
        const parsed = JSON.parse(line);
        const segment =
          (typeof parsed.message?.content === "string" && parsed.message.content) ||
          (typeof parsed.response === "string" && parsed.response) ||
          "";

        if (segment) {
          emit(segment);
        }

        if (parsed.done) {
          working = "";
          break;
        }
      } catch (error) {
        console.warn("Unable to parse Ollama stream chunk", error);
      }
    }

    newlineIndex = working.indexOf("\n");
  }

  return working;
}

async function safeParseJson(response: Response) {
  try {
    return await response.clone().json();
  } catch {
    try {
      return await response.clone().text();
    } catch {
      return null;
    }
  }
}
