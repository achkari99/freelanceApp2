"use client";

import { useFormState } from "react-dom";
import { addComponent } from "./actions";

const initialState = { success: false } as const;

export function ComponentForm() {
  const [state, formAction] = useFormState(addComponent, initialState);

  return (
    <section className="rounded-3xl border border-white/5 bg-white/5 p-6">
      <h2 className="text-lg font-semibold text-white">Add component</h2>
      <p className="mt-1 text-sm text-white/50">
        Describe the slice, specify the page it belongs to, and drop in the JSX. Once the table powering this form is
        connected to a build script, you can scaffold new sections effortlessly.
      </p>
      <form action={formAction} className="mt-6 space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-[0.35em] text-white/50">Component name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
            placeholder="Hero · Next-gen AI orchestrator"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-[0.35em] text-white/50">Page target</label>
          <select
            name="page"
            required
            className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
          >
            <option value="">Select a page</option>
            <option value="home">Homepage</option>
            <option value="results">Results</option>
            <option value="services">Services</option>
            <option value="backstage">Backstage</option>
            <option value="contact">Contact</option>
            <option value="custom">Custom landing</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-[0.35em] text-white/50">Why it exists</label>
          <textarea
            name="description"
            required
            className="min-h-[120px] w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
            placeholder="Describe how the slice is meant to be used and any content rules."
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-[0.35em] text-white/50">JSX snippet</label>
          <textarea
            name="code"
            required
            className="min-h-[160px] w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 font-mono text-xs text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
            placeholder={`<section className="...">\n  ...\n</section>`}
          />
        </div>
        {state?.error ? (
          <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">{state.error}</p>
        ) : state?.success ? (
          <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
            Saved! The slice is now catalogued in Supabase.
          </p>
        ) : null}
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_-30px_rgba(56,189,248,0.9)] transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60"
        >
          Publish slice
        </button>
      </form>
      <p className="mt-6 text-xs text-white/40">
        Tip: Back this table up in Supabase and plug it into a CLI that can drop components into new routes for rapid
        experiments.
      </p>
    </section>
  );
}
