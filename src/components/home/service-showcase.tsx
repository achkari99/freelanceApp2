"use client";

import * as React from "react";
import { Brain, Compass, Layers, Palette, Rocket } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import type { Service } from "@/data/services";

import { serviceAnimations } from "./service-animations";
import { serviceBackgrounds } from "./service-backgrounds";

const iconMap = {
  Rocket,
  Brain,
  Layers,
  Palette,
  Compass
};

const accentClasses: Record<string, string> = {
  sky: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-300"
};

const sectionTones = [
  "from-slate-50 via-white to-white dark:from-slate-900/40 dark:via-slate-950/40 dark:to-slate-950",
  "from-white via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900/80"
];

export type ServiceShowcaseProps = {
  service: Service;
  index: number;
};

export function ServiceShowcase({ service, index }: ServiceShowcaseProps) {
  const Icon = iconMap[service.icon as keyof typeof iconMap];
  const Animation = serviceAnimations[service.animation] ?? serviceAnimations.default;
  const Background = serviceBackgrounds[service.background] ?? serviceBackgrounds.default;
  const reversed = index % 2 === 1;
  const accent = accentClasses[service.accent] ?? "bg-slate-500/10 text-slate-600 dark:text-slate-300";
  const sectionTone = sectionTones[index % sectionTones.length];

  return (
    <section key={service.slug} className={`relative overflow-hidden bg-gradient-to-br ${sectionTone}`}>
      <Background accent={service.accent} />
      <div className={`relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-20 lg:flex-row ${reversed ? "lg:flex-row-reverse" : ""}`}>
        <Reveal className="w-full lg:w-1/2" direction={reversed ? "right" : "left"}>
          <Card className="relative h-full border-slate-200/80 bg-white/95 p-8 shadow-xl backdrop-blur-lg dark:border-slate-800/80 dark:bg-slate-950">
            <div className="absolute -left-12 top-12 hidden h-24 w-24 rounded-full bg-slate-100 blur-3xl dark:bg-slate-800 lg:block" aria-hidden />
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-3">
                {Icon ? (
                  <span
                    data-card-motion-item="avatar"
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-slate-900 dark:text-white ${accent}`}
                  >
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                ) : null}
                <div>
                  <Badge
                    data-card-motion-item="chip"
                    className="mb-3 bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  >
                    {service.teaser}
                  </Badge>
                  <h3 className="font-display text-3xl text-slate-900 dark:text-white">{service.name}</h3>
                </div>
              </div>
              <p className="text-base text-slate-600 dark:text-slate-300">{service.description}</p>
              <ul className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 inline-block h-2 w-2 rounded-full bg-sky-500" />
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
              <div
                data-card-motion-item="progress"
                className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400"
              >
                <span>ACH</span>
                <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                <span>48H</span>
              </div>
            </div>
          </Card>
        </Reveal>
        <Reveal className="w-full lg:w-1/2" direction={reversed ? "left" : "right"} delay={0.12}>
          {Animation ? <Animation accent={service.accent} /> : <div className="h-full min-h-[320px] w-full rounded-3xl border border-slate-200 bg-slate-900" />}
        </Reveal>
      </div>
    </section>
  );
}
