import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { team, principles } from "@/data/team";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About ACH",
  description:
    "Meet ACH, the 48H prototype squad inside RightMind Lab. Learn how we build AI, SaaS, and custom products faster than traditional agencies."
};

const timeline = [
  {
    year: "2022",
    title: "RightMind Lab forms",
    description: "We gathered product, AI, and design leaders to build a lab focused on rapid experimentation and ambitious ideas."
  },
  {
    year: "2023",
    title: "ACH launches the 48H program",
    description: "We formalised our 48-hour prototype offer so founders and enterprise teams could test bold concepts without months of risk."
  },
  {
    year: "2024",
    title: "From prototypes to platforms",
    description: "ACH prototypes now power production apps—from AI control hubs to healthcare portals—proving speed and quality can coexist."
  }
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <header className="max-w-4xl space-y-6">
        <Badge>About ACH</Badge>
        <h1 className="font-display text-4xl tracking-tight text-slate-900 dark:text-white">
          We prototype in 48 hours and scale with you for as long as it takes.
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          ACH is the rapid-build unit inside RightMind Lab. We pair technologists, designers, and strategists who love shipping fast—and shipping right. Every
          engagement starts with a 48-hour prototype, then grows into a reliable, scalable product with the same crew.
        </p>
        <Button asChild size="lg">
          <a href="/start-a-project">Start your 48H prototype</a>
        </Button>
      </header>

      <section className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((principle) => (
          <div
            key={principle.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <h2 className="font-display text-xl text-slate-900 dark:text-white">{principle.title}</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{principle.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-20 space-y-8">
        <h2 className="font-display text-3xl text-slate-900 dark:text-white">Leadership</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {team.map((person) => (
            <Link
              key={person.slug}
              href={`/leadership/${person.slug}`}
              className="group block h-full"
              aria-label={`View ${person.name}'s portfolio`}
            >
              <article className="h-full rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition will-change-transform group-hover:-translate-y-1 group-hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto h-32 w-32 overflow-hidden rounded-full">
                  <Image src={person.avatar} alt={person.name} width={160} height={160} className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-4 font-display text-xl text-slate-900 transition group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-300">
                  {person.name}
                </h3>
                <p className="text-sm text-sky-600 dark:text-sky-300">{person.role}</p>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{person.bio}</p>
              </article>
            </Link>
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
