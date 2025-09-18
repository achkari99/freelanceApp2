import type { Metadata } from "next";
import Image from "next/image";
import { team, principles } from "@/data/team";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the team behind Resonant Studio and learn how we collaborate with ambitious founders and marketing leaders."
};

const timeline = [
  {
    year: "2021",
    title: "Resonant is born",
    description: "After leading in-house teams, we formed a studio dedicated to aligning brand, product, and growth."
  },
  {
    year: "2022",
    title: "Shipping global launches",
    description: "We partnered with AI, fintech, and climate teams to launch new products across three continents."
  },
  {
    year: "2024",
    title: "Expanding our collective",
    description: "We introduced the backstage program--sharing playbooks, experiments, and in-progress work for our community."
  }
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <header className="max-w-4xl space-y-6">
        <Badge>About</Badge>
        <h1 className="font-display text-4xl tracking-tight text-slate-900 dark:text-white">We are a multidisciplinary team charting meaningful outcomes for brand, product, and growth leaders.</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Resonant Studio was founded to bring strategy, design, and experimentation under one roof. We embed with your team, operate transparently, and obsess over impact--not vanity metrics.
        </p>
        <Button asChild size="lg">
          <a href="/start-a-project">Start a project</a>
        </Button>
      </header>
      <section className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((principle) => (
          <div key={principle.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-display text-xl text-slate-900 dark:text-white">{principle.title}</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{principle.description}</p>
          </div>
        ))}
      </section>
      <section className="mt-20 space-y-8">
        <h2 className="font-display text-3xl text-slate-900 dark:text-white">Leadership</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {team.map((person) => (
            <article key={person.name} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mx-auto h-32 w-32 overflow-hidden rounded-full">
                <Image src={person.avatar} alt={person.name} width={160} height={160} className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-4 font-display text-xl text-slate-900 dark:text-white">{person.name}</h3>
              <p className="text-sm text-sky-600 dark:text-sky-300">{person.role}</p>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{person.bio}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-20 grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-display text-3xl text-slate-900 dark:text-white">A timeline of momentum</h2>
        <div className="space-y-6 border-l border-slate-200 pl-6 dark:border-slate-700">
          {timeline.map((entry) => (
            <div key={entry.year} className="relative pl-6">
              <span className="absolute -left-3 top-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-xs font-semibold text-white">
                {entry.year}
              </span>
              <h3 className="font-semibold text-slate-900 dark:text-white">{entry.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{entry.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


