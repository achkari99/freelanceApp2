import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { projects } from "content/work";
import { backstagePosts } from "content/backstage";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Search",
  description: "Search case studies, services, and backstage notes across Resonant Studio."
};

interface SearchPageProps {
  searchParams?: { q?: string };
}

type Result = {
  type: "Case study" | "Service" | "Backstage";
  title: string;
  href: string;
  excerpt: string;
  tags?: string[];
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = (searchParams?.q ?? "").trim();
  const normalized = query.toLowerCase();

  const results: Result[] = query
    ? [
        ...projects.map<Result>((project) => ({
          type: "Case study",
          title: project.title,
          href: `/work/${project.slug}`,
          excerpt: project.excerpt,
          tags: [...project.tags, ...project.services]
        })),
        ...services.map<Result>((service) => ({
          type: "Service",
          title: service.name,
          href: `/services#${service.slug}`,
          excerpt: service.teaser,
          tags: service.deliverables
        })),
        ...backstagePosts.map<Result>((post) => ({
          type: "Backstage",
          title: post.title,
          href: `/backstage/${post.slug}`,
          excerpt: post.excerpt,
          tags: post.tags
        }))
      ].filter((item) =>
        (item.title + item.excerpt + (item.tags ?? []).join(" ")).toLowerCase().includes(normalized)
      )
    : [];

  return (
    <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <header className="space-y-4">
        <Badge>Search</Badge>
        <h1 className="font-display text-4xl tracking-tight text-slate-900 dark:text-white">Search our work</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Explore published case studies, service offerings, and backstage notes. Looking for something specific? Email
          <a href="mailto:hello@resonant.studio" className="ml-1 text-sky-600 hover:underline dark:text-sky-400">
            hello@resonant.studio
          </a>
          .
        </p>
        <form method="get" className="mt-6">
          <label className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus-within:border-sky-500 dark:border-slate-800 dark:bg-slate-900">
            <span className="sr-only">Search all content</span>
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Start typing to search"
              className="w-full border-0 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
            />
            <button type="submit" className="text-sm font-semibold text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300">
              Search
            </button>
          </label>
        </form>
      </header>
      {query ? (
        <section className="mt-12 space-y-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {results.length} result{results.length === 1 ? "" : "s"} for &quot;{query}&quot;
          </p>
          {results.length ? (
            <ul className="space-y-6">
              {results.map((item) => (
                <li key={`${item.type}-${item.href}`} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <Link href={item.href} className="block space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
                      <span>{item.type}</span>
                      {item.tags?.slice(0, 3).map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                    <h2 className="font-display text-xl text-slate-900 dark:text-white">{item.title}</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{item.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">No matches yet, try another phrase.</p>
          )}
        </section>
      ) : (
        <section className="mt-12 space-y-2 text-sm text-slate-500 dark:text-slate-400">
          <p>Try searching for a client name, service, or topic like &quot;activation&quot; or &quot;design system&quot;.</p>
        </section>
      )}
    </div>
  );
}


