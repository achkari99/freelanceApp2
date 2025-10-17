"use client";

export type ChatRole = "system" | "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
  pending?: boolean;
  error?: boolean;
}

export interface ChatRequestPayload {
  messages: Array<{
    role: ChatRole;
    content: string;
  }>;
  signal?: AbortSignal;
}
