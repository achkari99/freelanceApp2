import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { LogoutButton } from "../logout-button";
import { AdminNav } from "../nav";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/requests", label: "Requests" },
  { href: "/admin/content", label: "Content Studio" },
  { href: "/admin/components", label: "Design Library" },
  { href: "/admin/settings", label: "Settings" }
];

export default async function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const supabase = createServerSupabaseClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin/login");
  }

  const firstName = session.user.user_metadata?.name?.split?.(" ")?.[0] ?? session.user.email?.split("@")?.[0] ?? "ACH";

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <aside className="hidden w-72 flex-none border-r border-white/5 bg-slate-950/80 px-8 py-10 backdrop-blur xl:flex">
        <div className="flex h-full flex-col gap-10">
          <div className="space-y-2">
            <Link href="/" className="text-lg font-semibold tracking-tight text-white">
              ACH Console
            </Link>
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">Prototype command center</p>
          </div>
          <AdminNav items={NAV_ITEMS} />
          <div className="space-y-4 rounded-2xl border border-white/5 bg-white/5 p-4">
            <div>
              <p className="text-sm font-medium text-white">{firstName}</p>
              <p className="text-xs text-white/50">{session.user.email}</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </aside>

      <div className="flex w-full flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/5 bg-slate-950/90 px-6 backdrop-blur">
          <div className="flex items-center gap-3 text-sm text-white/60 xl:hidden">
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/50">
              ACH Console
            </span>
            <span>Welcome back, {firstName}</span>
          </div>
          <div className="hidden items-center gap-3 text-sm text-white/50 xl:flex">
            <span>Welcome back,</span>
            <span className="font-semibold text-white">{firstName}</span>
          </div>
          <LogoutButton variant="ghost" />
        </header>
        <main className="flex-1 bg-slate-950 px-6 pb-12 pt-8">{children}</main>
      </div>
    </div>
  );
}
