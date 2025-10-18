"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteRequest } from "./actions";

type DeleteRequestButtonProps = {
  id: string;
  name?: string;
};

export function DeleteRequestButton({ id, name }: DeleteRequestButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => {
        const label = name ? `the request from ${name}` : "this request";
        if (window.confirm(`Are you sure you want to remove ${label}?`)) {
          startTransition(async () => {
            await deleteRequest(id);
          });
        }
      }}
      disabled={isPending}
      className="inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-red-200 transition hover:border-red-400/60 hover:text-red-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
