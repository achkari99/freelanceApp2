import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { createServiceSupabaseClient } from "@/lib/supabase/service";
import { DeleteRequestButton } from "./delete-request-button";
import { RequestsSearch } from "./search-form";

dayjs.extend(relativeTime);

type RequestRow = Record<string, unknown>;

type RequestsPageProps = {
  searchParams?: {
    q?: string;
  };
};

export const dynamic = "force-dynamic";

export default async function RequestsPage({ searchParams }: RequestsPageProps) {
  const searchQuery = typeof searchParams?.q === "string" ? searchParams.q.trim() : "";

  const supabase = createServiceSupabaseClient();
  let query = supabase
    .from("clients requests data")
    .select("*")
    .order("created_at", { ascending: false });

  if (searchQuery) {
    query = query.ilike("full name", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to fetch requests", error);
  }

  const fallbackText = "n/a";
  const rows = ((data ?? []) as RequestRow[]).map((row) => ({
    id: String(row.id ?? ""),
    name: (row["full name"] as string | null) ?? "Unknown",
    email: (row.email as string | null) ?? fallbackText,
    company: (row["company or team"] as string | null) ?? fallbackText,
    services: (row["focus area"] as string | null) ?? fallbackText,
    budget: (row["budget range"] as string | null) ?? fallbackText,
    status: String(row.status ?? "new"),
    timeline: (row.timeline as string | null) ?? fallbackText,
    createdAt: row.created_at ? dayjs(row.created_at as string).fromNow() : fallbackText
  }));

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Client requests</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/60">
            Every start-project submission is captured here. Use the search to quickly filter by client name, or remove records
            once you&apos;ve archived them in your CRM.
          </p>
        </div>
        <RequestsSearch />
      </header>

      {searchQuery ? (
        <p className="text-sm text-white/50">
          Showing results for <span className="font-semibold text-white">{searchQuery}</span>
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-3xl border border-white/5 bg-white/5 shadow-[0_25px_55px_-45px_rgba(15,23,42,0.8)]">
        <table className="min-w-[760px] divide-y divide-white/5 text-sm">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-[0.35em] text-white/50">
            <tr>
              <th className="px-5 py-3 font-semibold">Client</th>
              <th className="px-5 py-3 font-semibold">Company</th>
              <th className="px-5 py-3 font-semibold">Services</th>
              <th className="px-5 py-3 font-semibold">Budget</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Submitted</th>
              <th className="px-5 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-white/10">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-sm text-white/50">
                  No requests found. When prospects submit the start-project form, the feed will populate automatically.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td className="px-5 py-4">
                    <div className="font-medium text-white">{row.name}</div>
                    <p className="text-xs text-white/40">{row.email}</p>
                  </td>
                  <td className="px-5 py-4 text-white/70">{row.company}</td>
                  <td className="px-5 py-4 text-white/70">{row.services}</td>
                  <td className="px-5 py-4 text-white/60">{row.budget}</td>
                  <td className="px-5 py-4 text-xs uppercase tracking-[0.3em] text-white/60">
                    <StatusBadge value={row.status} />
                  </td>
                  <td className="px-5 py-4 text-white/60">{row.createdAt}</td>
                  <td className="px-5 py-4 text-right">
                    <DeleteRequestButton id={row.id} name={row.name} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs uppercase tracking-[0.32em] text-white/40 md:hidden">
        Tip: drag sideways on the table to see every column.
      </p>

      <section className="rounded-3xl border border-white/5 bg-white/5 p-6 text-sm text-white/60">
        <h2 className="text-lg font-semibold text-white">Next up</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5">
          <li>
            Add a <code>status</code> column to the Supabase table (<code>text</code>, default <code>new</code>) so you can mutate
            records via server actions.
          </li>
          <li>
            Optionally add <code>owner_id</code> and <code>follow_up_at</code> columns to enable assignments and reminders.
          </li>
          <li>
            Replace the legacy space-named columns with a dedicated <code>start_project_requests</code> table for simpler
            querying. The current API route can be updated to insert into the new schema without breaking anything.
          </li>
        </ol>
      </section>
    </div>
  );
}

function StatusBadge({ value }: { value: string }) {
  const normalized = value.toLowerCase().trim();
  const label = normalized.replace(/_/g, " ");

  const config: Record<string, string> = {
    new: "bg-sky-500/10 text-sky-300 border border-sky-500/30",
    discovery: "bg-amber-500/10 text-amber-300 border border-amber-400/30",
    production: "bg-indigo-500/10 text-indigo-300 border border-indigo-400/30",
    delivered: "bg-emerald-500/10 text-emerald-300 border border-emerald-400/30"
  };

  const style = config[normalized] ?? "bg-white/10 text-white/70 border border-white/10";

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${style}`}>{label}</span>;
}
