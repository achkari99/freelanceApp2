"use client";

import { MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useChatStore } from "./chat-store";

interface ChatLauncherProps {
  className?: string;
  unreadCount?: number;
}

export function ChatLauncher({ className, unreadCount = 0 }: ChatLauncherProps) {
  const isOpen = useChatStore((state) => state.isOpen);
  const toggle = useChatStore((state) => state.toggle);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      buttonRef.current?.setAttribute("aria-expanded", "true");
    } else {
      buttonRef.current?.setAttribute("aria-expanded", "false");
    }
  }, [isOpen]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-controls="ach-chat-dock"
      aria-label={isOpen ? "Close ACH Copilot" : "Open ACH Copilot"}
      data-unread={!isOpen && unreadCount > 0}
      className={cn(
        "group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-500 text-white shadow-[0_12px_40px_-16px_rgba(56,189,248,0.75)] transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_18px_60px_-24px_rgba(129,140,248,0.8)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
        "before:absolute before:-inset-3 before:rounded-full before:bg-sky-400/30 before:blur-xl before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100",
        isOpen ? "shadow-[0_22px_70px_-30px_rgba(129,140,248,0.9)]" : "",
        className
      )}
    >
      <span className="absolute -inset-1 rounded-full bg-sky-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute inset-0 rounded-full border border-white/15" />
      <MessageCircle className={cn("relative h-6 w-6 transition-transform duration-300", isOpen && "scale-90")} />
      <Sparkles className="pointer-events-none absolute -top-2 -right-1 h-4 w-4 animate-pulse text-white/80" />
      {!isOpen && unreadCount > 0 ? (
        <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-600 shadow-lg">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      ) : null}
      <span className="sr-only">Toggle ACH Copilot</span>
    </button>
  );
}
