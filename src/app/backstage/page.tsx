import type { Metadata } from "next";
import Link from "next/link";
import { BackstageFeed } from "@/components/backstage/backstage-feed";
import { Badge } from "@/components/ui/badge";
import { backstageSummaries } from "content/backstage";

export const metadata: Metadata = {
  title: "Lab Notes",
  description: "Field notes from ACH's 48H prototype lab."
};

export default function BackstagePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <header className="max-w-3xl space-y-6">
        <Badge>Lab Notes</Badge>
        <h1 className="font-display text-4xl tracking-tight text-slate-900 dark:text-white">Peek inside the lab to see the rituals, experiments, and frameworks that keep us shipping in 48 hours.</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          We publish the tactics, tools, and learnings while they are fresh--no polished case studies required.
        </p>
        <Link href="/contact" className="text-sm font-semibold text-slate-600 transition hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300">
          Have a question for the lab?
        </Link>
      </header>
      <div className="mt-12">
        <BackstageFeed posts={backstageSummaries} />
      </div>
    </div>
  );
}
