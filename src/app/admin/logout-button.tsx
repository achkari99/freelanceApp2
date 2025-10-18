"use client";

import { useTransition } from "react";
import { logout } from "./logout-action";

type LogoutButtonProps = {
  variant?: "primary" | "ghost";
};

export function LogoutButton({ variant = "primary" }: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => logout())}
      disabled={isPending}
      className={
        variant === "ghost"
          ? "inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-white/60 transition hover:border-white/20 hover:text-white disabled:opacity-50"
          : "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20 disabled:opacity-50"
      }
    >
      {isPending ? "Signing out…" : "Sign out"}
    </button>
  );
}
