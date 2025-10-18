import { createServiceSupabaseClient } from "@/lib/supabase/service";
import { ComponentForm } from "./component-form";

type ComponentEntry = {
  id: string;
  name: string;
  page: string;
  description: string;
  code: string;
  created_at: string;
};

export default async function ComponentsLibraryPage() {
  const supabase = createServiceSupabaseClient();
  const { data, error } = await supabase
    .from("ach_page_components")
    .select("id, name, page, description, code, created_at")
    .order("created_at", { ascending: false });

  const components = (data ?? []) as ComponentEntry[];

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">Design library</h1>
        <p className="max-w-3xl text-sm text-white/60">
          Document reusable building blocks for ACH pages. New entries sync to Supabase so the squad can explore UI
          patterns without touching code.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <section className="rounded-3xl border border-white/5 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Catalogue</h2>
              <p className="text-sm text-white/50">
                {error
                  ? "Supabase returned an error — see console for details."
                  : "Recently published slices ready to embed on marketing pages."}
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {components.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-6 text-center text-sm text-white/50">
                No components yet. Add your first slice using the form on the right—think hero sections, pricing grids,
                testimonial rows, anything the ACH squad reuses.
              </div>
            ) : (
              components.map((component) => (
                <article
                  key={component.id}
                  className="rounded-2xl border border-white/5 bg-slate-950/40 p-4 transition hover:border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-white">{component.name}</h3>
                      <p className="text-xs uppercase tracking-[0.35em] text-white/50">{component.page}</p>
                    </div>
                    <time className="text-xs text-white/40">
                      {new Date(component.created_at).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric"
                      })}
                    </time>
                  </div>
                  <p className="mt-3 text-sm text-white/70">{component.description}</p>
                  <details className="mt-4 rounded-xl border border-white/10 bg-slate-950/40">
                    <summary className="cursor-pointer rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                      Show snippet
                    </summary>
                    <pre className="overflow-x-auto px-3 py-3 text-xs text-white/70">{component.code}</pre>
                  </details>
                </article>
              ))
            )}
          </div>
        </section>

        <ComponentForm />
      </div>
    </div>
  );
}
