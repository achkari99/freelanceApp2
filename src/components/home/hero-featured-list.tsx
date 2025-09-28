"use client";

import * as React from "react";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export type HeroHighlightCard = {
  id: string;
  title: string;
  client: string;
  timeline: string;
  excerpt: string;
  tags: string[];
  href: string;
  hoverTone?: HoverTone;
};

type HoverTone = "sky" | "violet" | "emerald" | "amber";

type HeroFeaturedListProps = {
  cards: HeroHighlightCard[];
};

const containerVariants = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.2,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const hoverToneClasses: Record<HoverTone, { heading: string; accent: string }> = {
  sky: {
    heading: "group-hover:text-sky-500 dark:group-hover:text-sky-300",
    accent: "group-hover:text-sky-500 dark:group-hover:text-sky-300"
  },
  violet: {
    heading: "group-hover:text-violet-500 dark:group-hover:text-violet-300",
    accent: "group-hover:text-violet-500 dark:group-hover:text-violet-300"
  },
  emerald: {
    heading: "group-hover:text-emerald-500 dark:group-hover:text-emerald-300",
    accent: "group-hover:text-emerald-500 dark:group-hover:text-emerald-300"
  },
  amber: {
    heading: "group-hover:text-amber-500 dark:group-hover:text-amber-300",
    accent: "group-hover:text-amber-500 dark:group-hover:text-amber-300"
  }
};

export function HeroFeaturedList({ cards }: HeroFeaturedListProps) {
  if (cards.length === 0) {
    return null;
  }

  return (
    <motion.section
      className="mx-auto w-full max-w-6xl px-6 sm:px-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div variants={itemVariants} className="flex flex-col gap-3 text-left">
        <Badge className="w-max border-slate-800 bg-slate-900/80 text-white dark:border-white/20 dark:bg-white/10">
          Featured builds
        </Badge>
        <h2 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
          Proven in fast-moving sprints.
        </h2>
        <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Recent prototypes and service kits teams use to land investor demos, launch experiments, and grow fast.
        </p>
      </motion.div>

      <motion.ul
        variants={containerVariants}
        className="mt-10 flex gap-6 overflow-x-auto pb-6 [scrollbar-width:none] [-ms-overflow-style:none] sm:gap-8 md:gap-10 [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card) => {
          const tone = hoverToneClasses[card.hoverTone ?? "sky"];

          return (
            <motion.li
              key={card.id}
              variants={itemVariants}
              className="group w-[21rem] shrink-0 snap-start rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg sm:w-[23rem] dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-slate-700"
            >
              <Link href={card.href} className="flex h-full flex-col gap-3 text-left">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                  <span>{card.client}</span>
                  <span className="hidden h-1 w-1 rounded-full bg-slate-400 last:hidden dark:bg-slate-500 sm:block" aria-hidden />
                  <span className="text-slate-500 dark:text-slate-400">{card.timeline}</span>
                </div>
                <h3 className={"font-display text-2xl text-slate-900 transition " + tone.heading}>
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{card.excerpt}</p>
                <div className={"mt-3 inline-flex items-center text-sm font-semibold text-slate-900 transition " + tone.accent}>
                  View build story
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400 dark:text-slate-500">
                  {card.tags.slice(0, 4).map((tag) => (
                    <span key={`${card.id}-${tag}`} className="rounded-full border border-slate-200/70 px-3 py-1 dark:border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.section>
  );
}
