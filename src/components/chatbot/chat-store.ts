"use client";

import { create } from "zustand";
import type { ChatMessage } from "./chat-types";

const MAX_HISTORY = 24;

interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  toggle(): void;
  open(): void;
  close(): void;
  addMessage(message: ChatMessage): void;
  updateMessage(id: string, patch: Partial<ChatMessage>): void;
  appendToMessage(id: string, delta: string): void;
  reset(): void;
}

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  messages: [],
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages.slice(-MAX_HISTORY + 1), message]
    })),
  updateMessage: (id, patch) =>
    set((state) => ({
      messages: state.messages.map((message) => (message.id === id ? { ...message, ...patch } : message))
    })),
  appendToMessage: (id, delta) =>
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === id ? { ...message, content: `${message.content}${delta}` } : message
      )
    })),
  reset: () => set({ messages: [] })
}));
