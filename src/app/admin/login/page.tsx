import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "ACH Admin Console · Sign in"
};

export default async function LoginPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-12 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/5 bg-white/5 p-10 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 space-y-2 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/60">
            ACH Console
          </span>
          <h1 className="text-2xl font-semibold">Sign in to orchestrate</h1>
          <p className="text-sm text-white/60">
            Secure access for the ACH squad. Use your Supabase credentials to continue.
          </p>
        </div>
        <LoginForm />
        <p className="mt-8 text-center text-xs text-white/40">
          Need access? Ping the owners in the <strong>#ach-squad</strong> channel.
        </p>
      </div>
    </div>
  );
}
