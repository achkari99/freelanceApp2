"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type SearchItem = {
  type: "Build story" | "Service" | "Backstage";
  title: string;
  href: string;
  excerpt: string;
  tags?: string[];
};

interface SearchClientProps {
  items: SearchItem[];
}

export function SearchClient({ items }: SearchClientProps) {
  const [query, setQuery] = React.useState("");

  // Read the initial query from the URL on the client
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q") ?? "";
    setQuery(initialQuery);
  }, []);

  const normalized = query.trim().toLowerCase();

  const results = React.useMemo(() => {
    if (!normalized) {
      return [] as SearchItem[];
    }

    return items.filter((item) =>
      [item.title, item.excerpt, ...(item.tags ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [items, normalized]);

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const next = new URLSearchParams(window.location.search);
      const trimmed = query.trim();

      if (trimmed) {
        next.set("q", trimmed);
      } else {
        next.delete("q");
      }

      const nextSearch = next.toString();
      const nextUrl = nextSearch ? `${window.location.pathname}?${nextSearch}` : window.location.pathname;
      window.history.replaceState(null, "", nextUrl);
    },
    [query]
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <header className="space-y-4">
        <Badge>Search</Badge>
        <h1 className="font-display text-4xl tracking-tight text-slate-900 dark:text-white">Search our work</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Explore published build stories, service offerings, and backstage notes. Looking for something specific? Email
          <a href="mailto:ach.48hprototype@rightmind-labs.online" className="ml-1 text-sky-600 hover:underline dark:text-sky-400">
            ach.48hprototype@rightmind-labs.online
          </a>
          .
        </p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <label className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus-within:border-sky-500 dark:border-slate-800 dark:bg-slate-900">
            <span className="sr-only">Search all content</span>
            <input
              type="search"
              name="q"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Start typing to search"
              className="w-full border-0 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
            />
            <button type="submit" className="text-sm font-semibold text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300">
              Search
            </button>
          </label>
        </form>
      </header>
      {normalized ? (
        <section className="mt-12 space-y-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {results.length} result{results.length === 1 ? "" : "s"} for &quot;{query.trim()}&quot;
          </p>
          {results.length ? (
            <ul className="space-y-6">
              {results.map((item) => (
                <li
                  key={`${item.type}-${item.href}`}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
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
          <p>Try searching for RightMind AI, StockFlow, LabOps, or a capability like prototype or AI copilot.</p>
        </section>
      )}
    </div>
  );
}
