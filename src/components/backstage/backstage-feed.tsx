"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { preferReducedMotion } from "@/lib/utils";
import type { BackstagePostSummary } from "@/types/post";

interface BackstageFeedProps {
  posts: BackstagePostSummary[];
}

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut", staggerChildren: 0.08, delayChildren: 0.05 }
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: "easeIn" } }
} as const;

const cardVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 18,
    scale: 0.97,
    transition: { duration: 0.28, ease: "easeOut", delay: index * 0.05 }
  }),
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut", delay: index * 0.05 }
  }),
  exit: { opacity: 0, y: -14, scale: 0.98, transition: { duration: 0.22, ease: "easeIn" } }
} as const;

export function BackstageFeed({ posts }: BackstageFeedProps) {
  const [query, setQuery] = React.useState("");
  const [tag, setTag] = React.useState<string | null>(null);
  const shouldReduceMotion = preferReducedMotion();

  const filtered = React.useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesQuery = normalized
        ? (post.title + post.excerpt + post.tags.join(" ")).toLowerCase().includes(normalized)
        : true;
      const matchesTag = tag ? post.tags.includes(tag) : true;
      return matchesQuery && matchesTag;
    });
  }, [posts, query, tag]);

  const tags = React.useMemo(() => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(), [posts]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:flex-row md:items-center md:justify-between">
        <label className="relative flex w-full items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900 md:w-80">
          <Search className="h-4 w-4 text-slate-400" aria-hidden />
          <span className="sr-only">Search backstage posts</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts"
            className="w-full border-0 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
          />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Tags:</span>
          <Button
            variant={tag === null ? "default" : "ghost"}
            size="sm"
            className="rounded-full"
            onClick={() => setTag(null)}
          >
            All
          </Button>
          {tags.map((item) => (
            <Button
              key={item}
              variant={tag === item ? "default" : "ghost"}
              size="sm"
              className="rounded-full"
              onClick={() => setTag((current) => (current === item ? null : item))}
            >
              #{item}
            </Button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="popLayout" initial={!shouldReduceMotion}>
        <motion.div
          key={`${query}-${tag}`}
          className="grid gap-6 md:grid-cols-2"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? false : "visible"}
          exit={shouldReduceMotion ? undefined : "exit"}
        >
          {filtered.map((post, index) => (
            <motion.article
              key={post.slug}
              layout
              custom={index}
              variants={shouldReduceMotion ? undefined : cardVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              animate={shouldReduceMotion ? false : "visible"}
              exit={shouldReduceMotion ? undefined : "exit"}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition will-change-transform hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <Link href={`/backstage/${post.slug}`} className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
                <h2 className="font-display text-2xl text-slate-900 transition hover:text-sky-600 dark:text-white dark:hover:text-sky-300">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>
                <p className="text-xs uppercase tracking-wide text-slate-400">{new Date(post.publishedAt).toLocaleDateString()}</p>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>
      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-300">No posts match your filters just yet.</p>
      ) : null}
    </div>
  );
}
