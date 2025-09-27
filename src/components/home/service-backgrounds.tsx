"use client";

import * as React from "react";
import { motion } from "framer-motion";

export type ServiceBackgroundProps = {
  accent?: string;
};

type BackgroundComponent = (props: ServiceBackgroundProps) => JSX.Element;

const BaseWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">{children}</div>
);

const PrototypeBackground: BackgroundComponent = () => (
  <BaseWrapper>
    <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0a1b33] to-[#051020]" />
    {[...Array(8)].map((_, index) => (
      <motion.span
        key={index}
        className="absolute rounded-full bg-sky-500/20 blur-3xl"
        style={{
          width: `${180 + index * 20}px`,
          height: `${180 + index * 20}px`,
          left: `${-10 + index * 12}%`,
          top: `${index * 10}%`
        }}
        animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.85, 1.05, 0.85] }}
        transition={{ duration: 18 + index * 0.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
      />
    ))}
    <motion.div
      className="absolute inset-x-10 bottom-16 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent"
      animate={{ opacity: [0.2, 0.6, 0.2], scaleX: [0.8, 1.1, 0.8] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />
  </BaseWrapper>
);

const AIBackground: BackgroundComponent = () => (
  <BaseWrapper>
    <div className="absolute inset-0 bg-gradient-to-br from-[#110924] via-[#1a1034] to-[#070415]" />
    {[...Array(12)].map((_, index) => (
      <motion.span
        key={index}
        className="absolute h-1 w-14 rounded-full bg-violet-400/40"
        style={{ top: `${10 + index * 7}%`, left: index % 2 === 0 ? "10%" : "auto", right: index % 2 === 1 ? "8%" : "auto" }}
        animate={{ x: index % 2 === 0 ? [0, 30, 0] : [0, -30, 0] }}
        transition={{ duration: 8 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
    <motion.div
      className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/30"
      animate={{ rotate: [0, 60, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
    />
  </BaseWrapper>
);

const FullstackBackground: BackgroundComponent = () => (
  <BaseWrapper>
    <div className="absolute inset-0 bg-gradient-to-br from-[#031b17] via-[#042922] to-[#020d0b]" />
    {[...Array(5)].map((_, index) => (
      <motion.div
        key={index}
        className="absolute border border-emerald-400/35"
        style={{
          left: `${8 + index * 15}%`,
          top: `${index * 12}%`,
          width: `${220 + index * 40}px`,
          height: `${120 + index * 24}px`
        }}
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 14 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
    <motion.div
      className="absolute inset-x-12 bottom-12 h-24 rounded-3xl bg-emerald-400/10"
      animate={{ opacity: [0.25, 0.45, 0.25] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  </BaseWrapper>
);

const DesignBackground: BackgroundComponent = () => (
  <BaseWrapper>
    <div className="absolute inset-0 bg-gradient-to-br from-[#261405] via-[#2f1b07] to-[#120803]" />
    {[...Array(6)].map((_, index) => (
      <motion.span
        key={index}
        className="absolute rounded-full border border-amber-400/30"
        style={{ width: `${180 + index * 30}px`, height: `${180 + index * 30}px`, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        animate={{ rotate: [0, index % 2 === 0 ? 25 : -25, 0] }}
        transition={{ duration: 18 + index, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
    <motion.div
      className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.18),_transparent_65%)]"
      animate={{ opacity: [0.2, 0.45, 0.2] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
  </BaseWrapper>
);

const ConsultingBackground: BackgroundComponent = () => (
  <BaseWrapper>
    <div className="absolute inset-0 bg-gradient-to-br from-[#29090f] via-[#350e18] to-[#140307]" />
    {[...Array(9)].map((_, index) => (
      <motion.div
        key={index}
        className="absolute rounded-xl border border-rose-400/35"
        style={{
          padding: "18px",
          left: `${5 + (index % 3) * 28}%`,
          top: `${12 + Math.floor(index / 3) * 22}%`
        }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 11 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
    <motion.div
      className="absolute inset-x-16 top-16 h-32 rounded-full bg-rose-400/20 blur-3xl"
      animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
  </BaseWrapper>
);

const DefaultBackground: BackgroundComponent = () => (
  <BaseWrapper>
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
  </BaseWrapper>
);

export const serviceBackgrounds: Record<string, BackgroundComponent> = {
  prototype: PrototypeBackground,
  ai: AIBackground,
  fullstack: FullstackBackground,
  design: DesignBackground,
  consulting: ConsultingBackground,
  default: DefaultBackground
};
