import type { ReactNode } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { ArrowUpRight, Clock, Sparkles, Users } from "lucide-react";
import { createServiceSupabaseClient } from "@/lib/supabase/service";

type RequestRow = Record<string, unknown>;

dayjs.extend(relativeTime);

export default async function AdminHome() {
  const supabase = createServiceSupabaseClient();
  const { data: rows, error } = await supabase
    .from("clients requests data")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(12);

  if (error) {
    console.error("Failed to load client requests", error);
  }

  const requests = (rows ?? []) as RequestRow[];
  const fallbackText = "n/a";

  const totalRequests = requests.length;
  const newRequests = requests.filter((row) => String(row.status ?? "new").toLowerCase() === "new").length;
  const upcoming = requests
    .filter((row) => Boolean(row.timeline))
    .map((row) => ({
      name: (row["full name"] as string) ?? (row.email as string) ?? "Unknown",
      timeline: (row.timeline as string | null) ?? fallbackText
    }))
    .slice(0, 3);

  const topServices = collectTopServices(requests);
  const topServicesLabel = topServices.length ? topServices.map((service) => service.label).join(", ") : fallbackText;
  const timelineCount = upcoming.length ? upcoming.length.toString() : fallbackText;

  const tableRows = requests.map((row) => {
    const id = row.id ?? `${row.email ?? "request"}-${row.created_at ?? Math.random()}`;
    return {
      id: String(id),
      name: (row["full name"] as string | null) ?? "Unknown",
      email: (row.email as string | null) ?? fallbackText,
      services: (row["focus area"] as string | null) ?? fallbackText,
      budget: (row["budget range"] as string | null) ?? fallbackText,
      submitted: row.created_at ? dayjs(row.created_at as string).fromNow() : fallbackText
    };
  });

  return (
    <div className="space-y-10">
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Requests captured"
          value={totalRequests.toString()}
          description="Tracked in the Supabase CRM bucket"
          icon={<Users className="h-5 w-5 text-sky-400" />}
        />
        <KpiCard
          title="Fresh leads"
          value={newRequests.toString()}
          description='Marked as "new" and awaiting triage'
          icon={<Sparkles className="h-5 w-5 text-violet-400" />}
        />
        <KpiCard
          title="Upcoming timelines"
          value={timelineCount}
          description="Based on client-submitted target dates"
          icon={<Clock className="h-5 w-5 text-emerald-400" />}
        />
        <KpiCard
          title="Favourite services"
          value={topServicesLabel}
          description="Top selections across recent requests"
          icon={<ArrowUpRight className="h-5 w-5 text-amber-400" />}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
          <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Latest requests</h2>
              <p className="text-sm text-white/50">Surface signal from the last dozen submissions.</p>
            </div>
            <Link
              href="/admin/requests"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-white/60 transition hover:border-white/20 hover:text-white"
            >
              View all
            </Link>
          </header>
          <div className="-mx-4 sm:-mx-6">
            <div className="overflow-x-auto rounded-2xl border border-white/5 bg-white/5 shadow-[0_25px_55px_-45px_rgba(15,23,42,0.8)] [overscroll-behavior-x:contain] [touch-action:pan-x]">
              <table className="min-w-[760px] divide-y divide-white/5 text-sm">
                <thead className="bg-white/5 text-left text-xs uppercase tracking-[0.35em] text-white/50">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Client</th>
                    <th className="px-4 py-3 font-semibold">Services</th>
                    <th className="px-4 py-3 font-semibold">Budget</th>
                    <th className="px-4 py-3 font-semibold">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-white/10">
                  {tableRows.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-sm text-white/50">
                        No submissions just yet. Once prospects complete the start-project form, the stream will populate here.
                      </td>
                    </tr>
                  ) : (
                    tableRows.map((row) => (
                      <tr key={row.id}>
                        <td className="px-4 py-4">
                          <div className="font-medium text-white">{row.name}</div>
                          <p className="text-xs text-white/40">{row.email}</p>
                        </td>
                        <td className="px-4 py-4 text-white/80">{row.services}</td>
                        <td className="px-4 py-4 text-white/60">{row.budget}</td>
                        <td className="px-4 py-4 text-white/60">{row.submitted}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-2 px-1 text-xs uppercase tracking-[0.32em] text-white/40 sm:hidden">
            Tip: swipe sideways to inspect every column.
          </p>
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/5 bg-white/5 p-5">
            <h2 className="text-sm font-semibold text-white">This week&apos;s follow-ups</h2>
            <div className="mt-4 space-y-3">
              {upcoming.length ? (
                upcoming.map((item) => (
                  <div key={`${item.name}-${item.timeline}`} className="rounded-2xl border border-white/5 bg-white/5 p-3">
                    <p className="text-sm font-medium text-white">{item.name}</p>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/50">{item.timeline}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/50">No target dates captured yet. Encourage prospects to share theirs.</p>
              )}
            </div>
          </div>
          <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-indigo-500/20 via-transparent to-sky-500/20 p-5">
            <h2 className="text-sm font-semibold text-white">Need-to-know</h2>
            <ul className="mt-3 space-y-3 text-sm text-white/70">
              {[
                "Components tab lets you log reusable page blocks for future releases.",
                "Content Studio edits sync to Supabase so you can iterate without shipping code.",
                "Update request statuses from the Requests view to keep delivery ops aligned."
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-sky-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function collectTopServices(requests: RequestRow[]) {
  const counts = new Map<string, number>();

  requests.forEach((row) => {
    const servicesString = (row["focus area"] as string | null) ?? "";
    servicesString
      .split(",")
      .map((service) => service.trim())
      .filter(Boolean)
      .forEach((service) => {
        counts.set(service, (counts.get(service) ?? 0) + 1);
      });
  });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([label]) => ({ label }));
}

function KpiCard({
  title,
  value,
  description,
  icon
}: {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-6 shadow-[0_30px_80px_-50px_rgba(56,189,248,0.8)]">
      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80">
        {icon}
      </div>
      <p className="text-xs uppercase tracking-[0.35em] text-white/50">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-3 text-sm text-white/60">{description}</p>
    </div>
  );
}
