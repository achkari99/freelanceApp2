import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const email = session?.user.email ?? "—";

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">Console settings</h1>
        <p className="max-w-2xl text-sm text-white/60">
          Manage admin access, integrations, and operational templates. Supabase role management keeps your workspace
          secure.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-white/5 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Your session</h2>
          <dl className="mt-4 space-y-3 text-sm text-white/70">
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-white/50">Email</dt>
              <dd>{email}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-white/50">Supabase project</dt>
              <dd>{process.env.NEXT_PUBLIC_SUPABASE_URL ?? "—"}</dd>
            </div>
          </dl>
          <p className="mt-5 text-xs text-white/40">
            Need to invite another team member? Add them via the Supabase dashboard (Authentication → Users) and assign an{" "}
            <code>owner</code> or <code>editor</code> role in the <code>admin_users</code> table.
          </p>
        </article>
        <article className="rounded-3xl border border-white/5 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Operational templates</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>
              • Email templates live under <code>src/app/api/start-project/route.ts</code> – customize copy as needed.
            </li>
            <li>• Slack notifications flow through the <code>SLACK_WEBHOOK_URL</code> env variable.</li>
            <li>• Use Vercel environment variables to keep SMTP and Supabase keys secret.</li>
          </ul>
          <p className="mt-5 text-xs text-white/40">
            Coming soon: UI controls for email templates and environment toggles right inside the console.
          </p>
        </article>
      </section>
    </div>
  );
}
