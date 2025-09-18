"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "@/components/motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, preferReducedMotion } from "@/lib/utils";
import type { ProjectStatus, ProjectSummary } from "@/types/project";

const PAGE_SIZE = 6;

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
      delayChildren: 0.08,
      staggerChildren: 0.08
    }
  },
  exit: { opacity: 0, y: -18, transition: { duration: 0.25, ease: "easeInOut" } }
} as const;

const cardVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 28,
    scale: 0.96,
    transition: {
      duration: 0.32,
      ease: "easeOut",
      delay: index * 0.05
    }
  }),
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      delay: index * 0.05
    }
  }),
  exit: {
    opacity: 0,
    y: -18,
    scale: 0.98,
    transition: {
      duration: 0.22,
      ease: "easeIn"
    }
  }
} as const;

type WorkGridProps = {
  projects: ProjectSummary[];
  categories: string[];
  services: string[];
  tags: string[];
};

type FilterState = {
  query: string;
  status: ProjectStatus | "all";
  categories: string[];
  services: string[];
  tags: string[];
};

const initialFilters: FilterState = {
  query: "",
  status: "all",
  categories: [],
  services: [],
  tags: []
};

export function WorkGrid({ projects, categories, services, tags }: WorkGridProps) {
  const [filters, setFilters] = React.useState<FilterState>(initialFilters);
  const [page, setPage] = React.useState(1);

  const results = React.useMemo(() => {
    const normalizedQuery = filters.query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesQuery = normalizedQuery
        ? [project.title, project.excerpt, project.client, project.tags.join(" "), project.services.join(" ")]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery)
        : true;
      const matchesStatus = filters.status === "all" ? true : project.status === filters.status;
      const matchesCategories = filters.categories.length
        ? filters.categories.every((category) => project.categories.includes(category))
        : true;
      const matchesServices = filters.services.length
        ? filters.services.every((service) => project.services.includes(service))
        : true;
      const matchesTags = filters.tags.length ? filters.tags.every((tag) => project.tags.includes(tag)) : true;
      return matchesQuery && matchesStatus && matchesCategories && matchesServices && matchesTags;
    });
  }, [filters, projects]);

  React.useEffect(() => {
    setPage(1);
  }, [filters]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const startIndex = (page - 1) * PAGE_SIZE;
  const visible = results.slice(startIndex, startIndex + PAGE_SIZE);

  const toggle = (key: keyof Pick<FilterState, "categories" | "services" | "tags">, value: string) => {
    setFilters((prev) => {
      const set = new Set(prev[key]);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...prev, [key]: Array.from(set) };
    });
  };

  const shouldReduceMotion = preferReducedMotion();

  return (
    <div className="space-y-12">
      <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">Our Work</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Explore how we partner with teams across industries. Filter by service, category, or outcome to find stories relevant to your challenge.
            </p>
          </div>
          <label className="relative flex w-full items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:w-80">
            <Search className="h-4 w-4 text-slate-400" aria-hidden />
            <span className="sr-only">Search case studies</span>
            <input
              className="w-full border-0 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
              placeholder="Search case studies"
              value={filters.query}
              onChange={(event) => setFilters((prev) => ({ ...prev, query: event.target.value }))}
            />
          </label>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <FilterGroup label="Status">
            {(["all", "case-study", "coming-soon"] as const).map((status) => (
              <FilterChip
                key={status}
                active={filters.status === status}
                onClick={() => setFilters((prev) => ({ ...prev, status }))}
              >
                {status === "all" ? "All" : status === "case-study" ? "Live" : "Coming soon"}
              </FilterChip>
            ))}
          </FilterGroup>
          <FilterGroup label="Categories">
            {categories.map((category) => (
              <FilterChip
                key={category}
                active={filters.categories.includes(category)}
                onClick={() => toggle("categories", category)}
              >
                {category}
              </FilterChip>
            ))}
          </FilterGroup>
          <FilterGroup label="Services">
            {services.map((service) => (
              <FilterChip
                key={service}
                active={filters.services.includes(service)}
                onClick={() => toggle("services", service)}
              >
                {service}
              </FilterChip>
            ))}
          </FilterGroup>
        </div>
        <FilterGroup label="Tags">
          {tags.map((tag) => (
            <FilterChip
              key={tag}
              active={filters.tags.includes(tag)}
              onClick={() => toggle("tags", tag)}
            >
              #{tag}
            </FilterChip>
          ))}
        </FilterGroup>
        <div className="flex flex-wrap items-center gap-2">
          {filters.status !== "all" || filters.categories.length || filters.services.length || filters.tags.length || filters.query ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              onClick={() => setFilters(initialFilters)}
            >
              Reset filters
            </Button>
          ) : null}
        </div>
      </div>

      <div className="space-y-8">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Showing {visible.length} of {results.length} case studies
        </p>
        <AnimatePresence initial={!shouldReduceMotion} mode="popLayout">
          <motion.div
            key={`${filters.query}-${filters.status}-${filters.categories.join()}-${filters.services.join()}-${filters.tags.join()}-${page}`}
            layout
            className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
            variants={shouldReduceMotion ? undefined : containerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? false : "visible"}
            exit={shouldReduceMotion ? undefined : "exit"}
          >
            {visible.map((project, index) => (
              <motion.article
                key={project.slug}
                layout
                custom={index}
                variants={shouldReduceMotion ? undefined : cardVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                animate={shouldReduceMotion ? false : "visible"}
                exit={shouldReduceMotion ? undefined : "exit"}
                className="group/card overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition will-change-transform hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <Link href={`/work/${project.slug}`} className="flex h-full flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <motion.div
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="h-full w-full"
                    >
                      <Image src={project.hero.image} alt={project.hero.alt} fill sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw" className="object-cover" />
                    </motion.div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>{project.client}</Badge>
                      {project.status === "coming-soon" ? (
                        <Badge className="border-dashed border-slate-400 text-slate-500 dark:border-slate-600 dark:text-slate-300">
                          Coming soon
                        </Badge>
                      ) : null}
                    </div>
                    <h3 className="font-display text-xl text-slate-900 transition group-hover/card:text-sky-600 dark:text-white dark:group-hover/card:text-sky-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{project.excerpt}</p>
                    <div className="mt-auto flex flex-wrap gap-2 text-xs uppercase tracking-wide text-slate-400">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
        {pageCount > 1 ? (
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="text-slate-500 dark:text-slate-300">
              Page {page} of {pageCount}
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1}>
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                disabled={page === pageCount}
              >
                Next
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

type FilterGroupProps = {
  label: string;
  children: React.ReactNode;
};

function FilterGroup({ label, children }: FilterGroupProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

type FilterChipProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function FilterChip({ active, onClick, children }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
        active
          ? "border-sky-500 bg-sky-500/10 text-sky-700 dark:border-sky-300 dark:bg-sky-300/20 dark:text-sky-200"
          : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-100"
      )}
    >
      {children}
    </button>
  );
}
