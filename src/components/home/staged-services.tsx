"use client";

import * as React from "react";
import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { Brain, Compass, Layers, Lightbulb, Palette, Rocket } from "lucide-react";

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

const accentIndicators: Record<string, string> = {
  sky: "bg-sky-400",
  violet: "bg-violet-400",
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  rose: "bg-rose-400"
};

const accentRings: Record<string, string> = {
  sky: "ring-sky-300/35 shadow-[0_40px_90px_rgba(56,189,248,0.22)]",
  violet: "ring-violet-300/35 shadow-[0_40px_90px_rgba(167,139,250,0.22)]",
  emerald: "ring-emerald-300/35 shadow-[0_40px_90px_rgba(16,185,129,0.22)]",
  amber: "ring-amber-300/35 shadow-[0_40px_90px_rgba(251,191,36,0.22)]",
  rose: "ring-rose-300/35 shadow-[0_40px_90px_rgba(244,114,182,0.22)]"
};

type JiraHeroInstance = {
  destroy?: () => void;
  pause?: () => void;
  play?: () => void;
  runScenario?: () => Promise<void>;
};

type JiraHeroModule = {
  initJiraHero: (root: HTMLElement, options?: { forceReduceMotion?: boolean }) => JiraHeroInstance;
};

export function StagedServices() {
  const prefersReducedMotion = useFramerReducedMotion() || preferReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const serviceRefs = React.useRef<(HTMLElement | null)[]>([]);
  const heroRef = React.useRef<HTMLDivElement | null>(null);
  const heroHeading = (
    <div className="services-hero-heading">
      <span className="services-hero-heading__eyebrow">Live workflow</span>
      <h2 className="services-hero-heading__title">In-flight sprint tracker</h2>
      <p className="services-hero-heading__body">Follow commits, QA approvals, and handoffs as our team keeps your delivery moving on schedule.</p>
    </div>
  );


  React.useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const nodes = serviceRefs.current.filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const targetEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!targetEntry) {
          return;
        }

        const index = Number((targetEntry.target as HTMLElement).dataset.index ?? "0");
        setActiveIndex((previous) => (previous === index ? previous : index));
      },
      { threshold: [0.25, 0.45, 0.7], rootMargin: "-20% 0px -20%" }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  React.useEffect(() => {
    const node = heroRef.current;
    if (!node) {
      return;
    }

    let disposed: JiraHeroInstance | null = null;
    let cancelled = false;

    void import("@/animations/jiraHero")
      .then((module: JiraHeroModule) => {
        if (cancelled || !heroRef.current) {
          return;
        }

        disposed = module.initJiraHero(heroRef.current, {
          forceReduceMotion: Boolean(prefersReducedMotion)
        });
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") {
          console.error("Failed to initialize Jira hero animation", error);
        }
      });

    return () => {
      cancelled = true;
      disposed?.destroy?.();
      disposed = null;
    };
  }, [prefersReducedMotion]);

  const handleIndicatorClick = React.useCallback(
    (index: number) => {
      if (prefersReducedMotion) {
        return;
      }

      const target = serviceRefs.current[index];
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
    [prefersReducedMotion]
  );

  if (prefersReducedMotion) {
    return (
      <div className="space-y-16 bg-slate-950 py-24 text-white">
        {services.map((service, index) => (
          <StaticService key={service.slug} service={service} index={index} />
        ))}

        <section id="services-hero" data-role="decorative">
          {heroHeading}
          <div ref={heroRef} data-jira-hero-root />
        </section>

      </div>
    );
  }

  return (
    <section className="relative flex w-full flex-col bg-slate-950 px-6 py-24 text-white sm:px-10">
      <motion.header
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex w-full max-w-6xl flex-col gap-4"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Services</p>
        <h2 className="font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
          The sprint teams rely on to ship faster than their competition.
        </h2>
        <p className="max-w-3xl text-base text-slate-300">
          Each engagement moves from spark to shipped with clarity, automation, and measurable progress at every stage.
        </p>
      </motion.header>

      <div className="mx-auto mt-10 flex w-full max-w-6xl items-center gap-4 text-xs uppercase tracking-[0.3em] text-slate-500">
        {services.map((service, index) => {
          const isActive = activeIndex === index;
          const tone = isActive ? "text-white" : "text-slate-600";
          const dotTone = isActive ? accentIndicators[service.accent] ?? "bg-white" : "bg-slate-700";
          return (
            <button
              type="button"
              key={service.slug}
              onClick={() => handleIndicatorClick(index)}
              className="flex items-center gap-2 focus:outline-none"
              aria-label={`Scroll to service ${service.name}`}
              aria-pressed={isActive}
            >
              <span className={`h-2 w-2 rounded-full transition duration-300 ${dotTone}`} />
              <span className={`${tone}`}>{String(index + 1).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-12">
        {services.map((service, index) => (
          <ServiceStage
            key={service.slug}
            ref={(node) => {
              serviceRefs.current[index] = node;
            }}
            service={service}
            index={index}
            isActive={activeIndex === index}
          />
        ))}
      </div>
      <section id="services-hero" data-role="decorative">
        {heroHeading}
        <div ref={heroRef} data-jira-hero-root />
      </section>
    </section>
  );
}

type ServiceStageProps = {
  service: (typeof services)[number];
  index: number;
  isActive: boolean;
};

const ServiceStage = React.forwardRef<HTMLDivElement, ServiceStageProps>(
  ({ service, index, isActive }, forwardedRef) => {
    const Icon = iconMap[service.icon as keyof typeof iconMap];
    const Animation = serviceAnimations[service.animation] ?? serviceAnimations.default;
    const gradient = accentGradients[service.accent] ?? "from-slate-900 via-slate-950 to-slate-950";
    const badgeTone = accentBadges[service.accent] ?? "bg-slate-500/10 text-slate-300";
    const activeRing = isActive
      ? accentRings[service.accent] ?? "ring-white/25 shadow-[0_40px_90px_rgba(148,163,184,0.25)]"
      : "ring-1 ring-white/10 shadow-[0_20px_60px_rgba(15,23,42,0.35)]";

    return (
      <motion.div
        ref={forwardedRef}
        data-index={index}
        initial={{ opacity: 0, y: 72 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`grid gap-10 rounded-3xl border border-white/10 bg-gradient-to-br ${gradient} p-10 transition-all duration-500 lg:grid-cols-[1.05fr_0.95fr] ${activeRing}`}
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
);

ServiceStage.displayName = "ServiceStage";

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
