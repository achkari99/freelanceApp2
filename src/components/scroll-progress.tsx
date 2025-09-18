"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { preferReducedMotion } from "@/lib/utils";

export function ScrollProgressBar() {
  const shouldReduceMotion = preferReducedMotion();
  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: shouldReduceMotion ? 260 : 120,
    damping: shouldReduceMotion ? 36 : 18,
    mass: shouldReduceMotion ? 0.8 : 0.4
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-sky-500 via-sky-400 to-indigo-500"
        style={{ scaleX: progress }}
      />
    </div>
  );
}
