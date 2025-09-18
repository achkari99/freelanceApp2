import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Strategy, design, and growth engagements tailored to ship measurable outcomes for product teams."
};

const engagementRhythm = [
  {
    name: "Discover",
    description: "Research, stakeholder interviews, and landscape analysis uncover the real problem space.",
    duration: "Week 1-2"
  },
  {
    name: "Design",
    description: "Concepts, prototypes, and content systems that align cross-functional teams.",
    duration: "Week 3-6"
  },
  {
    name: "Ship",
    description: "High-fidelity deliverables, launch planning, and close collaboration with engineering and marketing.",
    duration: "Week 7-10"
  },
  {
    name: "Amplify",
    description: "Experiments, measurement, and enablement to keep momentum long after launch.",
    duration: "Week 11+"
  }
];

const guarantees = [
  "A small senior team embedded with your stakeholders",
  "Documentation and artifacts your team can maintain",
  "Experimentation and measurement baked into every engagement",
  "Clear communication rituals and async updates"
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <header className="space-y-6">
        <Badge>Services</Badge>
        <h1 className="font-display text-4xl tracking-tight text-slate-900 dark:text-white">We design integrated engagements across strategy, design, and growth.</h1>
        <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-300">
          Whether you need an end-to-end launch partner or a specialized sprint, we enter with rigor, ship with velocity, and align teams around outcomes that matter.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href="/start-a-project">Start a project</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Speak with a strategist</Link>
          </Button>
        </div>
      </header>
      <section className="mt-16 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.slug} id={service.slug}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl text-slate-900 dark:text-white">{service.name}</h2>
                <Badge>{service.slug.replace('-', ' ')}</Badge>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">{service.description}</p>
              <ul className="grid gap-2 text-sm text-slate-500 dark:text-slate-300">
                {service.deliverables.map((item) => (
                  <li key={item} className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-500" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </section>
      <section className="mt-20 grid gap-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="font-display text-3xl text-slate-900 dark:text-white">How our engagements flow</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            We operate in focused, transparent cycles. Expect dedicated working sessions, async documentation, and an operating rhythm tuned to your team.
          </p>
          <div className="mt-8 grid gap-6">
            {engagementRhythm.map((phase) => (
              <div key={phase.name} className="rounded-2xl border border-slate-100 bg-white/60 p-6 dark:border-slate-800 dark:bg-slate-950/40">
                <div className="flex items-center justify-between text-sm uppercase tracking-wide text-slate-400">
                  <span>{phase.duration}</span>
                  <span>{phase.name}</span>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/60">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">What we promise</h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {guarantees.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span aria-hidden className="mt-1 inline-block h-2 w-2 rounded-full bg-sky-500" />
                {item}
              </li>
            ))}
          </ul>
          <Button asChild variant="ghost" className="mt-4">
            <Link href="/backstage">See how we work in the open</Link>
          </Button>
        </aside>
      </section>
      <section className="mt-20 rounded-3xl bg-slate-950 p-10 text-white">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl">Ready to build momentum?</h2>
            <p className="mt-3 max-w-xl text-sm text-slate-300">
              Tell us about your upcoming initiative and we will design an engagement tailored to your needs.
            </p>
          </div>
          <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:border-white hover:bg-white/10">
            <Link href="/start-a-project">
              Share your brief
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}


