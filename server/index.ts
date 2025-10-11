import Fastify from "fastify";
import cors from "@fastify/cors";
import { generateAssistantStream } from "./openai";

type Role = "user" | "assistant";

type ChatMessage = {
  role: Role;
  content: string;
};

type ChatRequestBody = {
  messages: ChatMessage[];
  site_context?: Record<string, unknown>;
};

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_COUNT = 60;

const rateMap = new Map<string, { count: number; expires: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || entry.expires < now) {
    rateMap.set(ip, { count: 1, expires: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_COUNT) return false;
  entry.count += 1;
  return true;
}

const fastify = Fastify({
  logger: true,
});

fastify.post<{ Body: ChatRequestBody }>("/api/featherchat", async (request, reply) => {
  const ip = request.ip ?? request.headers["x-forwarded-for"]?.toString() ?? "0.0.0.0";
  if (!checkRateLimit(ip)) {
    reply.code(429).send({ error: "Rate limit exceeded. Try again later." });
    return;
  }

  const body = request.body;
  if (!Array.isArray(body?.messages) || body.messages.length === 0) {
    reply.code(400).send({ error: "messages array is required" });
    return;
  }

  const trimmedMessages = body.messages.slice(-8).map((message) => ({
    role: message.role,
    content: String(message.content ?? "").slice(0, 4000),
  }));

  const siteContext =
    typeof body.site_context === "object" && body.site_context !== null
      ? body.site_context
      : {};

  const systemPrompt = `You are FeatherChat, the AI assistant for this site. Use site_context when it contains relevant facts. If the answer is missing, ask one clarifying question before guessing. Always suggest a concrete next step such as emailing, scheduling a call, or exploring a service.`;

  const stream = await generateAssistantStream({
    systemPrompt,
    messages: trimmedMessages,
    siteContext,
  });

  reply
    .header("Content-Type", "text/event-stream")
    .header("Cache-Control", "no-store")
    .header("Connection", "keep-alive");

  reply.raw.write("event: open\n\n");

  try {
    for await (const event of stream) {
      if (event.type === "response.output_text.delta") {
        reply.raw.write(`data: ${JSON.stringify({ token: event.delta })}\n\n`);
      }
      if (event.type === "response.completed") {
        reply.raw.write("event: done\n\n");
      }
    }
  } catch (error) {
    reply.raw.write(
      `event: error\ndata: ${JSON.stringify({ message: (error as Error).message })}\n\n`
    );
  } finally {
    reply.raw.end();
  }
});

async function bootstrap() {
  await fastify.register(cors, {
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",")
      : true,
  });

  const host = process.env.HOST ?? "0.0.0.0";
  const port = Number(process.env.PORT ?? 8787);

  try {
    await fastify.listen({ host, port });
    fastify.log.info(`FeatherChat server listening on http://${host}:${port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

bootstrap();
