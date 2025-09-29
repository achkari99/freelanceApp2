"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

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
  const [showIndicator, setShowIndicator] = React.useState(() => !prefersReducedMotion);
  const stageRef = React.useRef(stage);
  const gateRef = React.useRef(false);
  const touchStartRef = React.useRef<number | null>(null);
  const heroRef = React.useRef<HTMLElement | null>(null);

  const finalScrollHoldRef = React.useRef(false);
  const finalScrollDeltaRef = React.useRef(0);

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
      setShowIndicator(false);
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

  const hideIndicator = React.useCallback(() => {
    setShowIndicator((previous) => {
      if (!previous) {
        return previous;
      }
      return false;
    });
  }, []);

  React.useEffect(() => {
    if (stage > 0) {
      hideIndicator();
    }
  }, [stage, hideIndicator]);

  React.useEffect(() => {
    if (!showIndicator || prefersReducedMotion) {
      return;
    }

    const handleScroll = () => {
      hideIndicator();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showIndicator, prefersReducedMotion, hideIndicator]);

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
      hideIndicator();
      setStage(nextStage);
      scheduleUnlock(nextStage);
    };

    const handleWheel = (event: WheelEvent) => {
      if (stageRef.current >= FINAL_STAGE || event.deltaY <= 0) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      hideIndicator();
      advanceStage();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (stageRef.current >= FINAL_STAGE) {
        return;
      }

      if (["ArrowDown", "PageDown", " ", "Enter"].includes(event.key)) {
        event.preventDefault();
        hideIndicator();
        advanceStage();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (stageRef.current >= FINAL_STAGE) {
        return;
      }

      if (touchStartRef.current === null) {
        touchStartRef.current = event.touches[0]?.clientY ?? null;
        return;
      }

      const currentY = event.touches[0]?.clientY ?? touchStartRef.current;
      const deltaY = touchStartRef.current - currentY;

      if (deltaY <= 0 || Math.abs(deltaY) < TOUCH_THRESHOLD) {
        return;
      }

      event.preventDefault();
      hideIndicator();
      advanceStage();
      touchStartRef.current = null;
    };

    const wheelTarget = window;
    const keyTarget = window;
    const touchTarget = heroRef.current ?? document;

    wheelTarget.addEventListener("wheel", handleWheel, { passive: false });
    keyTarget.addEventListener("keydown", handleKeyDown, { passive: false });
    touchTarget.addEventListener("touchstart", handleTouchStart as EventListener, { passive: false });
    touchTarget.addEventListener("touchmove", handleTouchMove as EventListener, { passive: false });

    return () => {
      wheelTarget.removeEventListener("wheel", handleWheel);
      keyTarget.removeEventListener("keydown", handleKeyDown);
      touchTarget.removeEventListener("touchstart", handleTouchStart as EventListener);
      touchTarget.removeEventListener("touchmove", handleTouchMove as EventListener);
    };
  }, [prefersReducedMotion, hideIndicator, stage]);

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

    const touchTarget: EventTarget = heroRef.current ?? document;

    function detach() {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      touchTarget.removeEventListener("touchstart", handleTouchStart as EventListener);
      touchTarget.removeEventListener("touchmove", handleTouchMove as EventListener);
    }

    function releaseHold() {
      finalScrollHoldRef.current = false;
      finalScrollDeltaRef.current = 0;
      touchStartRef.current = null;
      detach();
    }

    function handleWheel(event: WheelEvent) {
      if (!finalScrollHoldRef.current) {
        detach();
        return;
      }

      if (event.deltaY <= 0) {
        return;
      }

      finalScrollDeltaRef.current += event.deltaY;

      if (finalScrollDeltaRef.current < FINAL_SCROLL_UNLOCK_DISTANCE) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      event.preventDefault();
      releaseHold();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (!finalScrollHoldRef.current) {
        detach();
        return;
      }

      if (["ArrowDown", "PageDown", " ", "Enter"].includes(event.key)) {
        event.preventDefault();
        releaseHold();
      }
    }

    function handleTouchStart(event: TouchEvent) {
      if (!finalScrollHoldRef.current) {
        detach();
        return;
      }

      touchStartRef.current = event.touches[0]?.clientY ?? null;
    }

    function handleTouchMove(event: TouchEvent) {
      if (!finalScrollHoldRef.current) {
        detach();
        return;
      }

      if (touchStartRef.current === null) {
        touchStartRef.current = event.touches[0]?.clientY ?? null;
        return;
      }

      const currentY = event.touches[0]?.clientY ?? touchStartRef.current;
      const deltaY = (touchStartRef.current ?? currentY) - currentY;

      if (deltaY <= 0) {
        return;
      }

      finalScrollDeltaRef.current += deltaY;

      if (finalScrollDeltaRef.current < FINAL_SCROLL_UNLOCK_DISTANCE) {
        event.preventDefault();
        touchStartRef.current = currentY;
        return;
      }

      event.preventDefault();
      releaseHold();
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    touchTarget.addEventListener("touchstart", handleTouchStart as EventListener, { passive: false });
    touchTarget.addEventListener("touchmove", handleTouchMove as EventListener, { passive: false });

    return detach;
  }, [prefersReducedMotion, stage]);

  const ringsState = stage >= 1 ? "enter" : "initial";
  const headlineState = stage >= 2 ? "enter" : "initial";
  const bodyState = stage >= 3 ? "enter" : "initial";

  const handleIndicatorActivate = React.useCallback(() => {
    hideIndicator();
    if (typeof window !== "undefined") {
      window.scrollBy({ top: window.innerHeight * 0.4, behavior: "smooth" });
    }
  }, [hideIndicator]);

  const handlePrimaryClick = React.useCallback(() => {
    hideIndicator();
  }, [hideIndicator]);

  return (
    <section
      ref={heroRef}
      className="relative flex h-screen w-full overflow-hidden bg-slate-950 px-6 py-20 text-white sm:px-10 lg:px-16"
      aria-label="Hero"
    >
      {stage >= 1 ? (
        <motion.div
          className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full sm:w-4/5 lg:w-2/3 xl:w-1/2"
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
        className="relative z-20 flex h-full w-full max-w-5xl flex-col justify-center gap-10 py-10 sm:gap-12 sm:py-12 lg:py-0"
        variants={{
          initial: { opacity: 0, x: -80 },
          enter: { opacity: 1, x: 0 }
        }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        animate={ringsState}
        style={{ opacity: isBaseStage ? 0 : undefined }}
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
          className="flex max-w-2xl flex-col gap-8 text-left"
          variants={{
            initial: { opacity: 0, y: 56 },
            enter: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          animate={bodyState}
        >
          <p className="text-lg text-slate-200">
            We are ACH, the rapid-build unit inside RightMind Lab. In forty-eight hours we deliver clickable or coded prototypes for AI products, SaaS platforms, and mobile experiences, complete with architecture notes so you can scale with confidence.
          </p>
          <div className="flex flex-wrap gap-4">
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

      {showIndicator ? (
        <motion.button
          type="button"
          onClick={handleIndicatorActivate}
          aria-label="Scroll to unveil more"
          className="group absolute bottom-10 left-6 z-30 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 sm:left-10 lg:left-16"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.85, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span aria-hidden="true" className="select-none text-white/60">Scroll</span>
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white group-hover:border-white/40"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.button>
      ) : null}
    </section>
  );
}

