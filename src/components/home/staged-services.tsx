"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { ArrowUpRight, Brain, Compass, Layers, Lightbulb, Palette, Rocket } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { services } from "@/data/services";
import { preferReducedMotion } from "@/lib/utils";
import { serviceAnimations } from "@/components/home/service-animations";

const iconMap = {
  Rocket,
  Brain,
  Layers,
  Palette,
  Compass,
  Lightbulb
};

const accentGradients: Record<string, string> = {
  sky: "from-sky-500/20 via-slate-950 to-slate-950",
  violet: "from-violet-500/20 via-slate-950 to-slate-950",
  emerald: "from-emerald-500/20 via-slate-950 to-slate-950",
  amber: "from-amber-500/20 via-slate-950 to-slate-950",
  rose: "from-rose-500/20 via-slate-950 to-slate-950"
};

const accentBadges: Record<string, string> = {
  sky: "bg-sky-500/10 text-sky-300",
  violet: "bg-violet-500/10 text-violet-300",
  emerald: "bg-emerald-500/10 text-emerald-300",
  amber: "bg-amber-500/10 text-amber-300",
  rose: "bg-rose-500/10 text-rose-300"
};

const indicatorTone: Record<string, string> = {
  sky: "bg-sky-400",
  violet: "bg-violet-400",
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  rose: "bg-rose-400"
};

const FINAL_INDEX = services.length - 1;
const UNLOCK_DELAY = 1100;
const TOUCH_THRESHOLD = 24;

export function StagedServices() {
  const prefersReducedMotion = useFramerReducedMotion() || preferReducedMotion();

  const [stage, setStage] = React.useState(prefersReducedMotion ? FINAL_INDEX : -1);
  const stageRef = React.useRef(stage);
  const gateRef = React.useRef(false);
  const touchStartRef = React.useRef<number | null>(null);
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  React.useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const element = sectionRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const active = entry?.isIntersecting ?? false;
        setIsActive(active);
      },
      { threshold: 0.7 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  React.useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (isActive && stage === -1) {
      setStage(0);
    }
  }, [isActive, prefersReducedMotion, stage]);

  React.useEffect(() => {
    if (prefersReducedMotion || !isActive) {
      return;
    }

    const shouldLock = stage >= 0 && stage < FINAL_INDEX;
    if (!shouldLock) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [stage, prefersReducedMotion, isActive]);

  React.useEffect(() => {
    if (prefersReducedMotion || !isActive || stage >= FINAL_INDEX) {
      return;
    }

    const scheduleUnlock = () => {
      window.setTimeout(() => {
        gateRef.current = false;
      }, UNLOCK_DELAY);
    };

    const advanceStage = (nextIndex?: number) => {
      if (gateRef.current) {
        return;
      }

      const current = stageRef.current;
      if (current >= FINAL_INDEX) {
        return;
      }

      gateRef.current = true;
      setStage(nextIndex ?? Math.min(current + 1, FINAL_INDEX));
      scheduleUnlock();
    };

    const handleWheel = (event: WheelEvent) => {
      if (!isActive || stageRef.current >= FINAL_INDEX) {
        return;
      }

      if (event.deltaY <= 0) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      advanceStage();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isActive || stageRef.current >= FINAL_INDEX) {
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
      if (!isActive || stageRef.current >= FINAL_INDEX) {
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
      advanceStage();
      touchStartRef.current = null;
    };

    const wheelTarget: EventTarget = window;
    const keyTarget: EventTarget = window;
    const touchTarget: EventTarget = sectionRef.current ?? document;

    wheelTarget.addEventListener("wheel", handleWheel, { passive: false });
    keyTarget.addEventListener("keydown", handleKeyDown, { passive: false });
    touchTarget.addEventListener("touchstart", handleTouchStart, { passive: false });
    touchTarget.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      wheelTarget.removeEventListener("wheel", handleWheel as EventListener);
      wheelTarget.removeEventListener("keydown", handleKeyDown as EventListener);
      touchTarget.removeEventListener("touchstart", handleTouchStart as EventListener);
      touchTarget.removeEventListener("touchmove", handleTouchMove as EventListener);
    };
  }, [prefersReducedMotion, isActive, stage]);

  const handleIndicatorClick = React.useCallback(
    (index: number) => {
      if (prefersReducedMotion) {
        return;
      }
      gateRef.current = true;
      setStage(index);
      window.setTimeout(() => {
        gateRef.current = false;
      }, UNLOCK_DELAY);
    },
    [prefersReducedMotion]
  );

  if (prefersReducedMotion) {
    return (
      <div className="space-y-16 bg-slate-950 py-24 text-white">
        {services.map((service, index) => (
          <StaticService key={service.slug} service={service} index={index} />
        ))}
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[120vh] w-full flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 py-24 text-white sm:px-10"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12">
        <motion.header
          initial={false}
          variants={{ expanded: { opacity: 1, height: "auto", marginBottom: 0 }, collapsed: { opacity: 0, height: 0, marginBottom: -24 } }}
          animate={stage >= 0 ? "collapsed" : "expanded"}
          transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
          className="overflow-hidden"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Services</p>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
            The sprint teams rely on to ship faster than their competition.
          </h2>
          <p className="max-w-3xl text-base text-slate-300">
            Each engagement moves from spark to shipped with clarity, automation, and measurable progress at every stage.
          </p>
        </motion.header>

        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-slate-500">
          {services.map((service, index) => {
            const tone = indicatorTone[service.accent] ?? "bg-slate-500";
            const isActiveStage = stage === index;
            return (
              <button
                type="button"
                key={service.slug}
                onClick={() => handleIndicatorClick(index)}
                className="flex items-center gap-2 focus:outline-none"
                aria-label={`Go to service ${service.name}`}
              >
                <span className={`h-2 w-2 rounded-full ${isActiveStage ? tone : "bg-slate-700"} transition duration-300`} />
                <span className={`${isActiveStage ? "text-white" : "text-slate-600"}`}>{String(index + 1).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {services.map((service, index) => {
              const isVisible = stage === index;
              if (!isVisible) {
                return null;
              }

              return <ServiceStage key={service.slug} service={service} />;
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ServiceStage({ service }: { service: (typeof services)[number] }) {
  const Icon = iconMap[service.icon as keyof typeof iconMap];
  const Animation = serviceAnimations[service.animation] ?? serviceAnimations.default;
  const gradient = accentGradients[service.accent] ?? "from-slate-900 via-slate-950 to-slate-950";
  const badgeTone = accentBadges[service.accent] ?? "bg-slate-500/10 text-slate-300";

  return (
    <motion.div
      key={service.slug}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`grid gap-10 rounded-3xl border border-white/10 bg-gradient-to-br ${gradient} p-10 shadow-2xl lg:grid-cols-[1.05fr_0.95fr]`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-3">
            {Icon ? (
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 text-white/90 ${badgeTone}`}>
                <Icon className="h-6 w-6" aria-hidden />
              </span>
            ) : null}
            <Badge className="bg-white/10 text-white">{service.teaser}</Badge>
          </div>
          <h3 className="font-display text-3xl text-white sm:text-4xl">{service.name}</h3>
        </div>
        <p className="text-base text-slate-200/90">{service.description}</p>
        <ul className="grid gap-2 text-sm text-slate-200/80">
          {service.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/70" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          <span>ACH</span>
          <span className="h-px flex-1 bg-slate-600" />
          <span>48H</span>
        </div>
      </div>
      <div className="relative flex min-h-[300px] items-center justify-center rounded-3xl border border-white/10 bg-slate-950/40 p-6">
        {Animation ? <Animation accent={service.accent} /> : null}
      </div>
    </motion.div>
  );
}

function StaticService({ service, index }: { service: (typeof services)[number]; index: number }) {
  const Icon = iconMap[service.icon as keyof typeof iconMap];
  const badgeTone = accentBadges[service.accent] ?? "bg-slate-500/10 text-slate-300";
  const Animation = serviceAnimations[service.animation] ?? serviceAnimations.default;
  const isEven = index % 2 === 0;

  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row" key={service.slug}>
      <div className={`w-full lg:w-1/2 ${isEven ? "lg:pr-8" : "lg:order-2 lg:pl-8"}`}>
        <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/80 p-8">
          <div className="inline-flex items-center gap-3">
            {Icon ? (
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 text-white/90 ${badgeTone}`}>
                <Icon className="h-6 w-6" aria-hidden />
              </span>
            ) : null}
            <Badge className="bg-white/10 text-white">{service.teaser}</Badge>
          </div>
          <h3 className="font-display text-3xl text-white">{service.name}</h3>
          <p className="text-base text-slate-200/90">{service.description}</p>
          <ul className="grid gap-2 text-sm text-slate-200/80">
            {service.deliverables.map((deliverable) => (
              <li key={deliverable} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/70" aria-hidden />
                <span>{deliverable}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full rounded-3xl border border-white/10 bg-slate-900/60 p-6 lg:w-1/2">
        {Animation ? <Animation accent={service.accent} /> : null}
      </div>
    </section>
  );
}


