import type { Metadata } from "next";
import Link from "next/link";
import { BackstageFeed } from "@/components/backstage/backstage-feed";
import { Badge } from "@/components/ui/badge";
import { backstageSummaries } from "content/backstage";

export const metadata: Metadata = {
  title: "Backstage",
  description: "Notes, playbooks, and experiments from the Resonant Studio team."
};

export default function BackstagePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <header className="max-w-3xl space-y-6">
        <Badge>Backstage</Badge>
        <h1 className="font-display text-4xl tracking-tight text-slate-900 dark:text-white">Peek into how we work, learn, and experiment in the open.</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Essays, field notes, and frameworks published as we build alongside our partners.
        </p>
        <Link href="/contact" className="text-sm font-semibold text-slate-600 transition hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300">
          Want us to cover something specific?
        </Link>
      </header>
      <div className="mt-12">
        <BackstageFeed posts={backstageSummaries} />
      </div>
    </div>
  );
}

