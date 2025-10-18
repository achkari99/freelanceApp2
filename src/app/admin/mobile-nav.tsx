"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
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
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white/80 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
        aria-label="Toggle navigation"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-5 py-4">
              <Link
                href="/admin"
                className="text-sm font-semibold uppercase tracking-[0.32em] text-white transition hover:text-sky-300"
                onClick={() => setOpen(false)}
              >
                ACH Console
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="px-5">
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">Prototype command center</p>
            </div>
            <div className="mt-6 flex-1 overflow-y-auto px-5 pb-10">
              <AdminNav
                items={items}
                className="space-y-3 text-base text-white/80"
                onNavigate={() => setOpen(false)}
              />
            </div>
            <div className="border-t border-white/10 bg-white/5 px-5 py-5">
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-white">{userName}</p>
                  <p className="text-xs text-white/50">{userEmail}</p>
                </div>
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
