"use client";

import * as React from "react";
import { motion } from "framer-motion";

export type ServiceAnimationProps = {
  accent?: string;
};

const variantTransition = {
  duration: 12,
  repeat: Infinity,
  ease: "easeInOut"
};

type AnimationComponent = (props: ServiceAnimationProps) => JSX.Element;

const BasePanel = ({ children }: { children: React.ReactNode }) => (
  <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-800 shadow-lg dark:border-slate-700">
    <div className="absolute inset-0 opacity-60 mix-blend-screen">{children}</div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.12),_transparent_55%)]" />
  </div>
);

const PrototypeAnimation: AnimationComponent = () => (
  <BasePanel>
    {[...Array(6)].map((_, index) => (
      <motion.span
        key={index}
        className="absolute h-24 w-24 rounded-full bg-sky-500/40 blur-xl"
        initial={{ x: [20, 180, 340, 120, 260, 60][index % 6], y: [40, 80, 140, 200, 260, 120][index % 6] }}
        animate={{
          x: [40, 200, 360, 140, 280, 80][index % 6],
          y: [120, 260, 180, 240, 120, 200][index % 6]
        }}
        transition={{ ...variantTransition, delay: index * 0.5 }}
      />
    ))}
    <motion.div
      className="absolute left-1/2 top-1/2 h-32 w-52 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-sky-500/40 bg-slate-950/60 p-6 backdrop-blur"
      animate={{ rotate: [0, -2, 2, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="space-y-2 text-xs text-slate-200">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-400 text-[10px] text-slate-900">A</span>
          <div className="h-2 w-20 rounded bg-slate-700" />
        </div>
        <div className="h-2 w-32 rounded bg-slate-700" />
        <div className="h-2 w-36 rounded bg-slate-700" />
        <div className="h-2 w-28 rounded bg-slate-700" />
      </div>
    </motion.div>
  </BasePanel>
);

const AIAnimation: AnimationComponent = () => (
  <BasePanel>
    {[...Array(5)].map((_, index) => (
      <motion.div
        key={index}
        className="absolute h-20 w-20 rounded-full border border-violet-400/40"
        style={{ left: `${20 + index * 15}%`, top: `${15 + (index % 3) * 25}%` }}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: index * 0.6 }}
      >
        <motion.span
          className="absolute inset-2 rounded-full bg-violet-500/30"
          animate={{ opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.6 }}
        />
      </motion.div>
    ))}
    <motion.div
      className="absolute inset-0 m-auto h-56 w-56 rounded-full border border-violet-500/20 bg-gradient-to-b from-violet-500/20 via-transparent to-transparent"
      animate={{ rotate: [0, 45, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute left-1/2 top-1/2 h-32 w-40 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-violet-400/40 bg-slate-950/70 p-4 text-slate-100"
      animate={{ y: [-8, 8, -8] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="text-[10px] uppercase tracking-[0.3em] text-violet-300">AI router</div>
      <div className="mt-2 space-y-2 text-xs">
        {["Input", "Policy", "Best model"].map((label) => (
          <div key={label} className="flex items-center gap-2">
            <span className="h-1 w-16 rounded bg-slate-700" />
            <span className="h-1 w-10 rounded bg-violet-500/60" />
          </div>
        ))}
      </div>
    </motion.div>
  </BasePanel>
);

const FullstackAnimation: AnimationComponent = () => (
  <BasePanel>
    {[...Array(6)].map((_, index) => (
      <motion.div
        key={index}
        className="absolute rounded-xl border border-emerald-400/50 bg-emerald-500/10"
        style={{
          width: `${140 + index * 10}px`,
          height: `${70 + (index % 3) * 10}px`,
          left: `${10 + index * 12}%`,
          top: `${15 + (index % 4) * 18}%`
        }}
        animate={{
          y: [0, 12, 0],
          boxShadow: [
            "0 0 0 rgba(16, 185, 129, 0.2)",
            "0 20px 40px rgba(16, 185, 129, 0.18)",
            "0 0 0 rgba(16, 185, 129, 0.2)"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
      >
        <div className="absolute inset-2 rounded-lg border border-emerald-500/20 bg-slate-950/60" />
      </motion.div>
    ))}
    <motion.div
      className="absolute inset-x-8 bottom-8 rounded-2xl border border-emerald-500/30 bg-slate-950/80 p-4 text-xs text-slate-200"
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="grid grid-cols-3 gap-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="space-y-1">
            <div className="h-2 rounded bg-slate-700" />
            <div className="h-2 rounded bg-emerald-500/60" />
          </div>
        ))}
      </div>
    </motion.div>
  </BasePanel>
);

const DesignAnimation: AnimationComponent = () => (
  <BasePanel>
    {[...Array(3)].map((_, index) => (
      <motion.div
        key={index}
        className="absolute rounded-full border border-amber-400/60"
        style={{ width: `${160 + index * 60}px`, height: `${160 + index * 60}px`, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        animate={{ rotate: [0, 15 * (index % 2 === 0 ? 1 : -1), 0] }}
        transition={{ duration: 18 - index * 2, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
    <motion.div
      className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-amber-500/50 bg-gradient-to-br from-amber-500/20 via-transparent to-transparent p-6"
      animate={{ scale: [0.96, 1.04, 0.96] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="space-y-3 text-xs text-slate-800 dark:text-slate-200">
        <div className="h-3 rounded-full bg-white/70" />
        <div className="flex gap-2">
          <div className="h-16 flex-1 rounded-2xl bg-white/60" />
          <div className="flex flex-col gap-2">
            <span className="h-2 w-16 rounded bg-white/50" />
            <span className="h-2 w-12 rounded bg-white/40" />
            <span className="h-2 w-14 rounded bg-white/30" />
          </div>
        </div>
      </div>
    </motion.div>
  </BasePanel>
);

const ConsultingAnimation: AnimationComponent = () => (
  <BasePanel>
    {[...Array(4)].map((_, index) => (
      <motion.div
        key={index}
        className="absolute rounded-xl border border-rose-400/50 bg-rose-500/10 p-4 text-[10px] text-rose-200"
        style={{ left: `${15 + index * 18}%`, top: `${20 + (index % 2) * 25}%` }}
        animate={{ y: [0, -10, 0], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="h-1 w-10 rounded bg-rose-400/70" />
          <span className="h-1 w-6 rounded bg-rose-300/60" />
        </div>
        <div className="space-y-1">
          <div className="h-1 rounded bg-rose-300/40" />
          <div className="h-1 rounded bg-rose-300/30" />
          <div className="h-1 rounded bg-rose-300/20" />
        </div>
      </motion.div>
    ))}
    <motion.div
      className="absolute inset-x-10 bottom-10 rounded-2xl bg-slate-950/70 p-4 text-xs text-slate-100"
      animate={{ x: [-4, 4, -4] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-rose-300">Roadmap</div>
          <div className="mt-2 h-1 w-24 rounded bg-rose-400/60" />
        </div>
        <div className="h-10 w-10 rounded-full border border-rose-400/60 bg-rose-500/20" />
      </div>
    </motion.div>
  </BasePanel>
);

export const serviceAnimations: Record<string, AnimationComponent> = {
  prototype: PrototypeAnimation,
  ai: AIAnimation,
  fullstack: FullstackAnimation,
  design: DesignAnimation,
  consulting: ConsultingAnimation
};
