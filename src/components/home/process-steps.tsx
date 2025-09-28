"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lightbulb, PenTool, Rocket, Search, Sparkles } from "lucide-react";

const steps = [
  {
    id: "discover",
    icon: Search,
    step: "01",
    title: "Discover",
    subtitle: "30-minute call",
    description: "We align on goals, constraints, and audiences so every sprint starts focused.",
    accent: "from-sky-500/30 to-sky-600/20 hover:border-sky-400/70 hover:shadow-sky-400/40"
  },
  {
    id: "prototype",
    icon: Lightbulb,
    step: "02",
    title: "Prototype (48h)",
    subtitle: "Clickable demo",
    description: "Design, flows, and core interactions assembled into a polished walkthrough.",
    accent: "from-cyan-500/25 to-cyan-600/20 hover:border-cyan-400/70 hover:shadow-cyan-400/40"
  },
  {
    id: "validate",
    icon: PenTool,
    step: "03",
    title: "Validate",
    subtitle: "Feedback & scope",
    description: "We fold in stakeholder notes, sharpen UX, and map technical requirements.",
    accent: "from-violet-500/25 to-violet-600/20 hover:border-violet-400/70 hover:shadow-violet-400/40"
  },
  {
    id: "build",
    icon: Rocket,
    step: "04",
    title: "Build",
    subtitle: "Sprints & CI/CD",
    description: "Rapid implementation with automation, testing, and clear deployment steps.",
    accent: "from-emerald-500/25 to-emerald-600/20 hover:border-emerald-400/70 hover:shadow-emerald-400/40"
  },
  {
    id: "launch",
    icon: Sparkles,
    step: "05",
    title: "Launch",
    subtitle: "Handover + docs",
    description: "Seamless transition with playbooks, assets, and knowledge transfer for your team.",
    accent: "from-amber-500/25 to-amber-600/20 hover:border-amber-400/70 hover:shadow-amber-400/40"
  }
] as const;

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 }
};

export function ProcessSteps() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900" aria-hidden />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Our Process</p>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
            A fast, <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">precise</span> path from idea to production.
          </h2>
          <p className="max-w-3xl text-base text-slate-300">
            Every engagement runs through the same high-velocity playbook—keeping momentum high while protecting craft and reliability.
          </p>
        </div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="hidden h-px w-full bg-slate-800/60 lg:block" aria-hidden />
          <div className="mt-0 grid gap-6 lg:grid-cols-5">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.id}
                  variants={itemVariants}
                  className="group relative flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-900/30 p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:bg-slate-900/80 hover:shadow-2xl"
                >
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/70 text-sky-300 transition duration-300 group-hover:border-transparent group-hover:bg-gradient-to-br ${step.accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 group-hover:text-slate-300">{step.step}</div>
                    <h3 className="font-display text-xl text-white transition">{step.title}</h3>
                    <p className="text-sm font-semibold text-slate-200">{step.subtitle}</p>
                    <p className="text-sm text-slate-300/90">{step.description}</p>
                  </div>
                  <div className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 transition group-hover:text-white">
                    Next
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

