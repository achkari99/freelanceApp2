"use client";

import { useCallback, useRef, useState } from "react";
import type { ChatMessage } from "./chat-types";
import { useChatStore } from "./chat-store";

const SYSTEM_PROMPT = [
  "You are ACH Copilot, the official assistant for the ACH | 48H Prototype website operated by RightMind Lab.",
  "Rely exclusively on the brand, service, team, and contact information provided in your context. Do not speculate or invent details.",
  "When visitors ask for contact methods, use the specific emails, links, and calls-to-action provided. Mention individual team contacts when relevant.",
  "Keep responses concise, friendly, and oriented around ACH's offerings. If the context does not include an answer, say you do not have that information and suggest contacting the ACH team."
].join(" ");

const MAX_CONTEXT_MESSAGES = 12;

const mapForRequest = (messages: ChatMessage[]) =>
  messages
    .filter((message) => message.role !== "system")
    .slice(-MAX_CONTEXT_MESSAGES)
    .map(({ role, content }) => ({
      role,
      content
    }));

export function useChatRequest() {
  const addMessage = useChatStore((state) => state.addMessage);
  const appendToMessage = useChatStore((state) => state.appendToMessage);
  const updateMessage = useChatStore((state) => state.updateMessage);
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeAssistantId, setActiveAssistantId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const stop = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }, []);

  const sendMessage = useCallback(
    async (rawInput: string) => {
      const input = rawInput.trim();
      if (!input) {
        return;
      }

      const userMessage: ChatMessage = {
        id: createId(),
        role: "user",
        content: input,
        createdAt: new Date().toISOString()
      };

      const history = [...useChatStore.getState().messages, userMessage];

      addMessage(userMessage);

      const assistantId = createId();
      const assistantMessage: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
        pending: true
      };
      addMessage(assistantMessage);
      setIsStreaming(true);
      setError(null);
      setActiveAssistantId(assistantId);

      const controller = new AbortController();
      abortRef.current = controller;

      let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system: SYSTEM_PROMPT,
            messages: mapForRequest(history)
          }),
          signal: controller.signal
        });

        if (!response.ok || !response.body) {
          const message = await response.text();
          throw new Error(message || "Chat service responded with an error");
        }

        reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          if (chunk) {
            appendToMessage(assistantId, chunk);
          }
        }

        reader.releaseLock();

        updateMessage(assistantId, {
          pending: false,
          createdAt: new Date().toISOString()
        });
      } catch (cause) {
        const aborted = cause instanceof Error && cause.name === "AbortError";
        if (!aborted) {
          console.error("Chat request failed", cause);
        }

        const message =
          cause instanceof Error ? cause.message : "We ran into an unexpected issue.";

        updateMessage(assistantId, {
          pending: false,
          error: true,
          content: aborted ? "Conversation stopped." : `Sorry, something went wrong. ${message}`
        });

        if (!aborted) {
          setError(message);
        }
      } finally {
        if (reader) {
          try {
            await reader.cancel();
          } catch {
            // ignore cancellation errors while cleaning up the reader
          }
        }

        abortRef.current = null;
        setIsStreaming(false);
        setActiveAssistantId(null);
      }
    },
    [addMessage, appendToMessage, updateMessage]
  );

  return { sendMessage, stop, isStreaming, error, activeAssistantId };
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 10);
}
