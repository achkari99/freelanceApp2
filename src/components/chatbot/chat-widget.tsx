"use client";

import { useEffect, useRef, useState } from "react";
import { ChatLauncher } from "./chat-launcher";
import { ChatPanel } from "./chat-panel";
import { useChatStore } from "./chat-store";

export function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [unread, setUnread] = useState(0);
  const isOpen = useChatStore((state) => state.isOpen);
  const messages = useChatStore((state) => state.messages);
  const lastBadgeIdRef = useRef<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const latestAssistantMessage = [...messages]
      .slice()
      .reverse()
      .find((message) => message.role === "assistant" && !message.pending);

    if (isOpen) {
      setUnread(0);
      lastBadgeIdRef.current = latestAssistantMessage?.id ?? null;
      return;
    }

    if (!latestAssistantMessage) {
      return;
    }

    if (lastBadgeIdRef.current === latestAssistantMessage.id) {
      return;
    }

    lastBadgeIdRef.current = latestAssistantMessage.id;
    setUnread((count) => Math.min(99, count + 1));
  }, [messages, isOpen, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <ChatPanel />
      <ChatLauncher unreadCount={unread} className="fixed bottom-6 right-6 z-[95] max-md:bottom-5 max-md:right-4" />
    </>
  );
}
