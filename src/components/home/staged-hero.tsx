"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedHero } from "@/components/home/animated-hero";
import { preferReducedMotion } from "@/lib/utils";

const FINAL_STAGE = 3;
const TOUCH_THRESHOLD = 24;
const DEFAULT_UNLOCK_DELAY = 1200;
const STAGE_UNLOCK_DELAYS: Record<number, number> = {
  1: 1200,
  2: 1400,
  3: 0
};

export function StagedHero() {
  const prefersReducedMotion = useFramerReducedMotion() || preferReducedMotion();
  const [stage, setStage] = React.useState(prefersReducedMotion ? FINAL_STAGE : 0);
  const stageRef = React.useRef(stage);
  const gateRef = React.useRef(false);
  const touchStartRef = React.useRef<number | null>(null);
  const heroRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setStage(FINAL_STAGE);
    }
  }, [prefersReducedMotion]);

  React.useEffect(() => {
    if (typeof document === "undefined" || stage >= FINAL_STAGE) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [stage]);

  React.useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const scheduleUnlock = (nextStage: number) => {
      const delay = STAGE_UNLOCK_DELAYS[nextStage] ?? DEFAULT_UNLOCK_DELAY;
      window.setTimeout(() => {
        gateRef.current = false;
      }, delay);
    };

    const advanceStage = () => {
      const currentStage = stageRef.current;

      if (gateRef.current || currentStage >= FINAL_STAGE) {
        return;
      }

      const nextStage = Math.min(currentStage + 1, FINAL_STAGE);

      gateRef.current = true;
      setStage(nextStage);
      scheduleUnlock(nextStage);
    };

    const handleWheel = (event: WheelEvent) => {
      if (stageRef.current >= FINAL_STAGE || event.deltaY <= 0) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      advanceStage();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (stageRef.current >= FINAL_STAGE) {
        return;
      }

      if (["ArrowDown", "PageDown", " ", "Enter"].includes(event.key)) {
        event.preventDefault();
        advanceStage();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (stageRef.current >= FINAL_STAGE || touchStartRef.current === null) {
        return;
      }

      const currentY = event.touches[0]?.clientY ?? touchStartRef.current;
      const deltaY = touchStartRef.current - currentY;

      if (deltaY <= 0 || Math.abs(deltaY) < TOUCH_THRESHOLD) {
        return;
      }

      event.preventDefault();
      advanceStage();
      touchStartRef.current = null;
    };

    const wheelTarget: EventTarget = window;
    const keyTarget: EventTarget = window;
    const touchTarget: EventTarget = heroRef.current ?? document;

    wheelTarget.addEventListener?.("wheel", handleWheel, { passive: false });
    keyTarget.addEventListener?.("keydown", handleKeyDown, { passive: false });
    touchTarget.addEventListener?.("touchstart", handleTouchStart, { passive: false });
    touchTarget.addEventListener?.("touchmove", handleTouchMove, { passive: false });

    return () => {
      wheelTarget.removeEventListener?.("wheel", handleWheel as EventListener);
      keyTarget.removeEventListener?.("keydown", handleKeyDown as EventListener);
      touchTarget.removeEventListener?.("touchstart", handleTouchStart as EventListener);
      touchTarget.removeEventListener?.("touchmove", handleTouchMove as EventListener);
    };
  }, [prefersReducedMotion]);

  const ringsState = stage >= 1 ? "enter" : "initial";
  const headlineState = stage >= 2 ? "enter" : "initial";
  const bodyState = stage >= 3 ? "enter" : "initial";

  return (
    <section ref={heroRef} className="relative flex h-screen w-full overflow-hidden bg-slate-950 text-white" aria-label="Hero">
      {stage >= 1 ? (
        <motion.div
          className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full sm:w-4/5 lg:w-2/3 xl:w-1/2"
          variants={{
            initial: { x: "100%", opacity: 0 },
            enter: { x: "0%", opacity: 1 }
          }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          animate={ringsState}
        >
          <AnimatedHero effect="rings" className="absolute inset-0" />
        </motion.div>
      ) : null}

      <motion.div
        className="relative z-20 flex h-full w-full max-w-4xl flex-col justify-center gap-10 bg-gradient-to-r from-slate-950 via-slate-950 to-transparent px-6 py-20 sm:px-10 lg:px-16"
        variants={{
          initial: { opacity: 0, x: -80 },
          enter: { opacity: 1, x: 0 }
        }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        animate={ringsState}
      >
        <motion.div
          className="flex flex-col gap-8 text-left"
          variants={{
            initial: { opacity: 0, x: -40 },
            enter: { opacity: 1, x: 0 }
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          animate={headlineState}
        >
          <Badge className="w-max border-white/30 bg-white/10 text-white backdrop-blur">
            <Sparkles className="mr-2 h-3.5 w-3.5" /> ACH | Better than AI and faster
          </Badge>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Your idea, our prototype in 48 hours.
          </h1>
        </motion.div>

        <motion.div
          className="flex flex-col gap-8 text-left"
          variants={{
            initial: { opacity: 0, y: 56 },
            enter: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          animate={bodyState}
        >
          <p className="max-w-2xl text-lg text-slate-200">
            We are ACH, the rapid-build unit inside RightMind Lab. In forty-eight hours we deliver clickable or coded prototypes for AI products, SaaS platforms, and mobile experiences, complete with architecture notes so you can scale with confidence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/start-a-project">
                Start your prototype for free
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:border-white/60 hover:bg-white/10"
            >
              <Link href="/services">
                Explore what we build
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}



