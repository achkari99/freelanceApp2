"use client";

import { Loader2, Send, Sparkles, StopCircle, X } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import type { FormEvent, KeyboardEvent, RefObject } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useChatStore } from "./chat-store";
import type { ChatMessage } from "./chat-types";
import { useChatRequest } from "./use-chat-request";

interface ChatPanelProps {
  className?: string;
}

export function ChatPanel({ className }: ChatPanelProps) {
  const isOpen = useChatStore((state) => state.isOpen);
  const close = useChatStore((state) => state.close);
  const messages = useChatStore((state) => state.messages);
  const { sendMessage, stop, isStreaming, activeAssistantId } = useChatRequest();
  const [input, setInput] = useState("");
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const scrollToBottom = useCallback(
    ({ smooth }: { smooth?: boolean } = {}) => {
      if (!viewportRef.current) {
        return;
      }

      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto"
      });
    },
    []
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const raf = requestAnimationFrame(() => {
      textareaRef.current?.focus();
      scrollToBottom({ smooth: true });
    });

    return () => cancelAnimationFrame(raf);
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    scrollToBottom({ smooth: true });
  }, [messages, isStreaming, isOpen, scrollToBottom]);

  const resetTextarea = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!input.trim() || isStreaming) {
        return;
      }

      await sendMessage(input);
      setInput("");
      resetTextarea();
    },
    [input, isStreaming, resetTextarea, sendMessage]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        if (input.trim() && !isStreaming) {
          void sendMessage(input);
          setInput("");
          resetTextarea();
        }
      }
    },
    [input, isStreaming, resetTextarea, sendMessage]
  );

  const handleStop = useCallback(() => {
    stop();
  }, [stop]);

const emptyState = useMemo(
    () => (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-white/70">
        <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white/5 backdrop-blur">
          <span className="absolute inset-0 bg-gradient-to-br from-sky-400/70 via-indigo-400/50 to-transparent" />
          <Sparkles className="relative h-7 w-7 text-white" />
        </span>
        <div className="space-y-2 px-6">
          <p className="text-base font-semibold text-white">Need a creative partner?</p>
          <p className="text-sm text-white/70">
            Ask about prototypes, service packages, team capabilities, or how to kick off a project.
          </p>
        </div>
      </div>
    ),
    []
  );

  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-24 right-6 z-[90] w-[min(360px,calc(100vw-2.5rem))] max-md:bottom-20 max-md:right-4 max-sm:w-[calc(100vw-2rem)]",
        className
      )}
    >
      <div
        id="ach-chat-dock"
        role="dialog"
        aria-label="ACH Copilot conversation"
        aria-hidden={!isOpen}
        className={cn(
          "pointer-events-auto transform transition-all duration-400 ease-out",
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0 scale-[0.98]"
        )}
      >
        <div className="relative flex h-[520px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.45),transparent_55%),radial-gradient(circle_at_80%_120%,rgba(99,102,241,0.45),transparent_55%),linear-gradient(140deg,rgba(15,23,42,0.92),rgba(30,41,71,0.85))] shadow-[0_32px_80px_-24px_rgba(59,130,246,0.45)] backdrop-blur-[18px]">
          <div className="pointer-events-none absolute -top-16 right-[-60px] h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-[-40px] h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />

          <header className="relative z-10 flex items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-inner shadow-sky-500/20">
                <span className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/5 to-transparent" />
                <Sparkles className="relative h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">ACH Copilot</p>
                <p className="flex items-center gap-2 text-[11px] text-emerald-400/90">
                  <span className="flex h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400" />
                  Online now
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close chat"
              className="group rounded-full border border-white/10 bg-white/10 p-2 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
            >
              <X className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
            </button>
          </header>

          <div
            ref={viewportRef}
            onWheel={(event) => event.stopPropagation()}
            onTouchMove={(event) => event.stopPropagation()}
            className="relative z-0 flex flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-5 pb-6 pt-2"
          >
            {messages.length === 0 ? (
              emptyState
            ) : (
              messages.map((message) => (
                <ChatBubble key={message.id} message={message} isStreaming={isStreaming && message.id === activeAssistantId} />
              ))
            )}
            {isStreaming && <TypingIndicator />}
          </div>

          <footer className="relative z-10 border-t border-white/10 bg-white/5 px-4 pb-4 pt-3 backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex items-end gap-3 rounded-3xl border border-white/15 bg-white/10 p-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value);
                    autoResize(textareaRef);
                  }}
                  onInput={() => autoResize(textareaRef)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about our process..."
                  rows={1}
                  className="max-h-32 flex-1 resize-none bg-transparent text-sm text-white placeholder:text-white/50 focus-visible:outline-none"
                />
                {isStreaming ? (
                  <button
                    type="button"
                    onClick={handleStop}
                    className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <StopCircle className="h-4 w-4" />
                    Stop
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-sky-400 via-indigo-400 to-violet-500 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_10px_25px_-15px_rgba(56,189,248,0.8)] transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </button>
                )}
              </div>
            </form>
          </footer>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ message, isStreaming }: { message: ChatMessage; isStreaming: boolean }) {
  const isUser = message.role === "user";
  const bubbleClass = isUser
    ? "ml-auto bg-gradient-to-br from-sky-400 via-indigo-400 to-violet-500 text-white shadow-[0_18px_45px_-18px_rgba(79,70,229,0.6)]"
    : message.error
    ? "border border-red-400/50 bg-red-400/10 text-red-50"
    : "border border-white/10 bg-white/5 text-white/90 backdrop-blur";

  const formattedContent = message.content.trim() || (message.pending ? "..." : "");
  const parsedContent = useMemo(() => renderMarkdown(formattedContent), [formattedContent]);

  return (
    <div
      className={cn(
        "flex max-w-[85%] flex-col gap-2 rounded-3xl px-4 py-3 text-sm leading-6",
        bubbleClass,
        isUser ? "items-end" : "items-start"
      )}
    >
      <div
        className={cn(
          "prose prose-invert prose-sm max-w-none prose-headings:tracking-tight prose-p:my-0 prose-strong:font-semibold prose-em:opacity-90 prose-ul:my-1.5 prose-li:my-0 marker:text-current [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
          isUser ? "text-white" : "text-white/90"
        )}
        dangerouslySetInnerHTML={{ __html: parsedContent }}
      />
      {!isUser && (
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
          {message.error ? "Retry or reformulate" : isStreaming || message.pending ? "Drafting" : "Answered"}
        </span>
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex max-w-[70%] items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
      <Loader2 className="h-4 w-4 animate-spin text-white/70" />
      <span className="text-sm text-white/70">Sketching a response...</span>
    </div>
  );
}

function autoResize(ref: RefObject<HTMLTextAreaElement | null>) {
  const textarea = ref.current;
  if (!textarea) {
    return;
  }
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

marked.setOptions({ gfm: true, breaks: true });

function renderMarkdown(text: string) {
  if (!text) {
    return "";
  }

  const raw = marked.parse(text);
  const html = typeof raw === "string" ? raw : "";
  return DOMPurify.sanitize(html);
}
