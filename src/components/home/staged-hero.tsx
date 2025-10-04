"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { ArrowRight, ChevronsDown, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedHero } from "@/components/home/animated-hero";
import { preferReducedMotion } from "@/lib/utils";

const FINAL_STAGE = 3;
const TOUCH_THRESHOLD = 18;
const DEFAULT_UNLOCK_DELAY = 900;
const STAGE_UNLOCK_DELAYS: Record<number, number> = {
  1: 850,
  2: 950,
  3: 0
};

const FINAL_SCROLL_UNLOCK_DISTANCE = 140;

export function StagedHero() {
  const prefersReducedMotion = useFramerReducedMotion() || preferReducedMotion();
  const [stage, setStage] = React.useState(prefersReducedMotion ? FINAL_STAGE : 0);
  const [showScrollCue, setShowScrollCue] = React.useState(true);
  const stageRef = React.useRef(stage);
  const gateRef = React.useRef(false);
  const touchStartRef = React.useRef<number | null>(null);
  const heroRef = React.useRef<HTMLElement | null>(null);

  const finalScrollHoldRef = React.useRef(false);
  const finalScrollDeltaRef = React.useRef(0);
  const scrollCueDismissedRef = React.useRef(false);

  const isBaseStage = stage === 0;

  React.useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const supportsScrollRestoration = "scrollRestoration" in window.history;
    let previousRestoration: History["scrollRestoration"] | undefined;

    if (supportsScrollRestoration) {
      previousRestoration = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0 });

    return () => {
      if (supportsScrollRestoration && previousRestoration) {
        window.history.scrollRestoration = previousRestoration;
      }
    };
  }, []);

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setStage(FINAL_STAGE);
      finalScrollHoldRef.current = false;
      finalScrollDeltaRef.current = 0;
    }
  }, [prefersReducedMotion]);

  React.useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (stage === FINAL_STAGE) {
      finalScrollHoldRef.current = true;
      finalScrollDeltaRef.current = 0;
    }
  }, [stage, prefersReducedMotion]);

  const dismissScrollCue = React.useCallback(() => {
    if (scrollCueDismissedRef.current) {
      return;
    }

    scrollCueDismissedRef.current = true;
    setShowScrollCue(false);
  }, []);

  React.useEffect(() => {
    if (!prefersReducedMotion && stage > 0) {
      dismissScrollCue();
    }
  }, [stage, prefersReducedMotion, dismissScrollCue]);

  React.useEffect(() => {
    if (!showScrollCue) {
      return;
    }

    const handleScroll = () => {
      if (!scrollCueDismissedRef.current && typeof window !== "undefined" && window.scrollY <= 2) {
        return;
      }
      dismissScrollCue();
    };

    const handleKeyDown = () => {
      dismissScrollCue();
    };

    const handlePointerDown = () => {
      dismissScrollCue();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [showScrollCue, dismissScrollCue]);

  React.useEffect(() => {
    if (typeof document === "undefined" || stage >= FINAL_STAGE) {
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

      if (nextStage === FINAL_STAGE) {
        finalScrollHoldRef.current = true;
        finalScrollDeltaRef.current = 0;
      }

      gateRef.current = true;
      dismissScrollCue();
      setStage(nextStage);
      scheduleUnlock(nextStage);
    };

    const handleWheel: EventListener = (event) => {
      const wheelEvent = event as WheelEvent;
      if (stageRef.current >= FINAL_STAGE || wheelEvent.deltaY <= 0) {
        return;
      }

      wheelEvent.preventDefault();
      wheelEvent.stopPropagation();
      dismissScrollCue();
      advanceStage();
    };

    const handleKeyDown: EventListener = (event) => {
      const keyboardEvent = event as KeyboardEvent;
      if (stageRef.current >= FINAL_STAGE) {
        return;
      }

      if (["ArrowDown", "PageDown", " ", "Enter"].includes(keyboardEvent.key)) {
        keyboardEvent.preventDefault();
        dismissScrollCue();
        advanceStage();
      }
    };

    const handleTouchStart: EventListener = (event) => {
      const touchEvent = event as TouchEvent;
      touchStartRef.current = touchEvent.touches[0]?.clientY ?? null;
    };

    const handleTouchMove: EventListener = (event) => {
      const touchEvent = event as TouchEvent;
      if (stageRef.current >= FINAL_STAGE) {
        return;
      }

      if (touchStartRef.current === null) {
        touchStartRef.current = touchEvent.touches[0]?.clientY ?? null;
        return;
      }

      const currentY = touchEvent.touches[0]?.clientY ?? touchStartRef.current;
      const deltaY = (touchStartRef.current ?? currentY) - currentY;

      if (deltaY <= 0 || Math.abs(deltaY) < TOUCH_THRESHOLD) {
        return;
      }

      touchEvent.preventDefault();
      dismissScrollCue();
      advanceStage();
      touchStartRef.current = null;
    };

    const wheelTarget = window;
    const keyTarget = window;
    const touchTarget = heroRef.current ?? document;

    wheelTarget.addEventListener("wheel", handleWheel, { passive: false });
    keyTarget.addEventListener("keydown", handleKeyDown, { passive: false });
    touchTarget.addEventListener("touchstart", handleTouchStart, { passive: false });
    touchTarget.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      wheelTarget.removeEventListener("wheel", handleWheel);
      keyTarget.removeEventListener("keydown", handleKeyDown);
      touchTarget.removeEventListener("touchstart", handleTouchStart);
      touchTarget.removeEventListener("touchmove", handleTouchMove);
    };
  }, [prefersReducedMotion, dismissScrollCue, stage]);

  React.useEffect(() => {
    if (
      typeof window === "undefined" ||
      prefersReducedMotion ||
      stage < FINAL_STAGE ||
      !finalScrollHoldRef.current
    ) {
      return;
    }

    finalScrollDeltaRef.current = 0;
    touchStartRef.current = null;

    const touchTarget: Document | HTMLElement = heroRef.current ?? document;

    const handleWheel: EventListener = (event) => {
      if (!finalScrollHoldRef.current) {
        detach();
        return;
      }

      const wheelEvent = event as WheelEvent;
      if (wheelEvent.deltaY <= 0) {
        return;
      }

      finalScrollDeltaRef.current += wheelEvent.deltaY;

      if (finalScrollDeltaRef.current < FINAL_SCROLL_UNLOCK_DISTANCE) {
        wheelEvent.preventDefault();
        wheelEvent.stopPropagation();
        return;
      }

      wheelEvent.preventDefault();
      releaseHold();
    };

    const handleKeyDown: EventListener = (event) => {
      if (!finalScrollHoldRef.current) {
        detach();
        return;
      }

      const keyboardEvent = event as KeyboardEvent;
      if (["ArrowDown", "PageDown", " ", "Enter"].includes(keyboardEvent.key)) {
        keyboardEvent.preventDefault();
        releaseHold();
      }
    };

    const handleTouchStart: EventListener = (event) => {
      if (!finalScrollHoldRef.current) {
        detach();
        return;
      }

      const touchEvent = event as TouchEvent;
      touchStartRef.current = touchEvent.touches[0]?.clientY ?? null;
    };

    const handleTouchMove: EventListener = (event) => {
      if (!finalScrollHoldRef.current) {
        detach();
        return;
      }

      const touchEvent = event as TouchEvent;
      if (touchStartRef.current === null) {
        touchStartRef.current = touchEvent.touches[0]?.clientY ?? null;
        return;
      }

      const currentY = touchEvent.touches[0]?.clientY ?? touchStartRef.current;
      const deltaY = (touchStartRef.current ?? currentY) - currentY;

      if (deltaY <= 0) {
        return;
      }

      finalScrollDeltaRef.current += deltaY;

      if (finalScrollDeltaRef.current < FINAL_SCROLL_UNLOCK_DISTANCE) {
        touchEvent.preventDefault();
        touchStartRef.current = currentY;
        return;
      }

      touchEvent.preventDefault();
      releaseHold();
    };

    const detach = () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      touchTarget.removeEventListener("touchstart", handleTouchStart);
      touchTarget.removeEventListener("touchmove", handleTouchMove);
    };

    const releaseHold = () => {
      finalScrollHoldRef.current = false;
      finalScrollDeltaRef.current = 0;
      touchStartRef.current = null;
      detach();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    touchTarget.addEventListener("touchstart", handleTouchStart, { passive: false });
    touchTarget.addEventListener("touchmove", handleTouchMove, { passive: false });

    return detach;
  }, [prefersReducedMotion, stage]);

  const ringsState = stage >= 1 ? "enter" : "initial";
  const headlineState = stage >= 2 ? "enter" : "initial";
  const bodyState = stage >= 3 ? "enter" : "initial";

  const handleScrollCueActivate = React.useCallback(() => {
    dismissScrollCue();
    if (typeof window !== "undefined") {
      window.scrollBy({ top: window.innerHeight * 0.4, behavior: "smooth" });
    }
  }, [dismissScrollCue]);

  const handlePrimaryClick = React.useCallback(() => {
    dismissScrollCue();
  }, [dismissScrollCue]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100svh] w-full overflow-hidden bg-slate-950 px-safe pb-20 pt-24 text-white sm:px-8 sm:pb-24 lg:px-16 pt-safe pb-safe"
      aria-label="Hero"
    >
      {stage >= 1 ? (
        <motion.div
          className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-full max-w-4xl sm:block sm:w-4/5 lg:w-2/3 xl:w-1/2"
          variants={{
            initial: { x: "-18%", opacity: 0, scale: 0.94 },
            enter: { x: "0%", opacity: 1, scale: 1 }
          }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          animate={ringsState}
        >
          <AnimatedHero effect="rings" className="absolute inset-0" />
        </motion.div>
      ) : null}

      <motion.div
        className="relative z-20 flex h-full w-full max-w-6xl flex-col items-start justify-center gap-10 px-6 py-8 sm:gap-12 sm:px-8 sm:py-12 lg:px-0 lg:py-14"
        variants={{
          initial: { opacity: 0, x: -80 },
          enter: { opacity: 1, x: 0 }
        }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        animate={ringsState}
        style={{ opacity: isBaseStage ? 0 : undefined }}
      >
        <motion.div
          className="flex flex-col gap-6 text-left sm:gap-8"
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
          <h1 className="font-display text-3xl leading-tight sm:text-5xl lg:text-6xl">
            Your idea, our prototype in 48 hours.
          </h1>
        </motion.div>

        <motion.div
          className="flex max-w-xl flex-col gap-6 text-left sm:max-w-2xl sm:gap-8"
          variants={{
            initial: { opacity: 0, y: 56 },
            enter: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          animate={bodyState}
        >
          <p className="text-base text-slate-200 sm:text-lg">
            We are ACH, the rapid-build unit inside RightMind Lab. In forty-eight hours we deliver clickable or coded prototypes for AI products, SaaS platforms, and mobile experiences, complete with architecture notes so you can scale with confidence.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button asChild size="lg">
              <Link href="/start-a-project" onClick={handlePrimaryClick}>
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
              <Link href="/services" onClick={handlePrimaryClick}>
                Explore what we build
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {showScrollCue ? (

        <motion.button

          type="button"

          onClick={handleScrollCueActivate}

          aria-label="Scroll down"

          className="group pointer-events-auto absolute bottom-32 sm:bottom-40 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-center text-white/80 shadow-lg backdrop-blur transition hover:bg-white/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 dark:bg-white/20"

          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}

          animate={

            prefersReducedMotion

              ? { opacity: 1, y: 0 }

              : { opacity: 1, y: [0, -8, 0], scale: [1, 1.04, 1] }

          }

          transition={
            prefersReducedMotion 
            ? { duration: 0.2 }
            : { duration: 2.1, ease: [0.45, 0, 0.55, 1], repeat: Infinity, repeatDelay: 0.2 }
          }

        >

          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition duration-300 group-hover:bg-white/25">

            <ChevronsDown className="h-5 w-5" aria-hidden />

            <span className="absolute inset-0 rounded-full border border-white/30 opacity-50" />

            <span className="absolute -inset-2 rounded-full bg-white/10 opacity-0 transition group-hover:opacity-40" />

          </span>

          <span className="text-sm font-medium tracking-wide text-white/80 sm:pl-1">Scroll to explore</span>

        </motion.button>

      ) : null}
    </section>
  );
}










