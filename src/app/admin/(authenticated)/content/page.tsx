import Link from "next/link";
import { projects } from "content/work";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";

export default function ContentStudioPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">Content studio</h1>
        <p className="max-w-3xl text-sm text-white/60">
          Ground truth still lives in TypeScript modules. This studio gives you a bird’s-eye view and documents how to
          extend your Supabase schema so marketing can edit directly from the console.
        </p>
      </header>

      <section className="rounded-3xl border border-white/5 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Results catalogue</h2>
            <p className="text-sm text-white/50">
              Pulled directly from <code>content/work</code>. Edit the files today, or migrate to Supabase tomorrow.
            </p>
          </div>
          <Link
            href="https://supabase.com/docs/guides/database/tables"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-white/60 transition hover:border-white/20 hover:text-white"
          >
            Schema guide
          </Link>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.slug} className="rounded-2xl border border-white/5 bg-slate-950/40 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">{project.title}</h3>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">{project.status}</p>
                </div>
                <Link
                  href={`/content/work/${project.slug}.tsx`}
                  prefetch={false}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white/60 transition hover:border-white/20 hover:text-white"
                >
                  Open file
                </Link>
              </div>
              <p className="mt-3 text-sm text-white/70">{project.excerpt}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.35em] text-white/40">{project.services.join(" · ")}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Services</h2>
          <p className="text-sm text-white/50">
            Defined in <code>src/data/services.ts</code>. Each service includes teaser, description, deliverables, and accent.
          </p>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            {services.map((service) => (
              <li key={service.slug} className="rounded-2xl border border-white/5 bg-slate-950/40 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{service.name}</p>
                  <span className="text-xs uppercase tracking-[0.35em] text-white/50">{service.accent}</span>
                </div>
                <p className="mt-2 text-white/60">{service.teaser}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Testimonials</h2>
          <p className="text-sm text-white/50">
            Stored in <code>src/data/testimonials.ts</code>. Migrate them to Supabase table <code>ach_testimonials</code> when
            you’re ready.
          </p>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            {testimonials.map((testimonial, idx) => (
              <li key={`${testimonial.name}-${idx}`} className="rounded-2xl border border-white/5 bg-slate-950/40 p-4">
                <p className="text-white">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="mt-2 text-xs uppercase tracking-[0.35em] text-white/50">
                  {testimonial.name} · {testimonial.role} · {testimonial.company}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-indigo-500/20 via-transparent to-sky-500/20 p-6 text-sm text-white/60">
        <h2 className="text-lg font-semibold text-white">Content CMS roadmap</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5">
          <li>
            Create Supabase tables mirroring the structures above (e.g. <code>ach_projects</code>, <code>ach_services</code>,
            <code>ach_testimonials</code>). Copy the seed data from the TypeScript files.
          </li>
          <li>
            Update the website pages to fetch from Supabase (either at build time via Next.js Server Components or at runtime
            with ISR).
          </li>
          <li>
            Replace the code-file editing flow with the form-driven experience right here in the dashboard.
          </li>
        </ol>
        <p className="mt-4">
          Need a jumpstart? Use the command palette inside the console (<kbd>⌘K</kbd>) to scaffold common sections once the
          Supabase tables are live.
        </p>
      </section>
    </div>
  );
}
