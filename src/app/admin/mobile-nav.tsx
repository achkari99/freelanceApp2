"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "./logout-button";
import { AdminNav } from "./nav";

type NavItem = {
  href: string;
  label: string;
};

type AdminMobileNavProps = {
  items: NavItem[];
  userEmail: string;
  userName: string;
};

export function AdminMobileNav({ items, userEmail, userName }: AdminMobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white/80 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
        aria-label="Toggle navigation"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
            <div className="w-[92%] max-w-sm rounded-3xl border border-white/10 bg-slate-950/95 p-5 shadow-[0_35px_75px_-25px_rgba(15,23,42,0.9)]">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <Link
                    href="/admin"
                    className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    ACH Console
                  </Link>
                  <p className="text-xs text-white/50">Prototype command center</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/10 bg-white/10 p-2 text-white/70 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                  aria-label="Close navigation"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <div className="mt-5 space-y-4">
                <AdminNav
                  items={items}
                  className="space-y-3 text-base text-white/90"
                  onNavigate={() => setOpen(false)}
                />
                <div className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{userName}</p>
                    <p className="text-xs text-white/50">{userEmail}</p>
                  </div>
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
