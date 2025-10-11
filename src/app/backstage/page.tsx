import type { Metadata } from "next";
import Link from "next/link";
import CardSwap, { Card } from "~/cards_swap";
import { BackstageFeed } from "@/components/backstage/backstage-feed";
import { Badge } from "@/components/ui/badge";
import { backstageSummaries } from "content/backstage";

export const metadata: Metadata = {
  title: "Lab Notes",
  description: "Field notes from ACH's 48H prototype lab."
};

export default function BackstagePage() {
  const featuredPosts = backstageSummaries.slice(0, 4);

  return (
    <div className="pb-20">
      <section className="relative isolate overflow-hidden bg-slate-950 px-6 pb-20 pt-24 text-white sm:rounded-[48px] lg:px-8">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute left-[-18%] top-[-35%] h-80 w-80 rounded-full bg-sky-500/35 blur-[120px]" />
          <div className="absolute right-[-8%] top-[10%] h-96 w-96 rounded-full bg-cyan-400/25 blur-[140px]" />
          <div className="absolute bottom-[-25%] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-slate-900/60 blur-[160px]" />
        </div>
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="max-w-3xl space-y-6">
            <Badge className="w-max border-white/30 bg-white/10 text-white backdrop-blur">Lab Notes</Badge>
            <h1 className="font-display text-4xl tracking-tight text-white">
              Peek inside the lab to see the rituals, experiments, and frameworks that keep us shipping in 48 hours.
            </h1>
            <p className="text-lg text-slate-100/90">
              We publish the tactics, tools, and learnings while they are fresh--no polished case studies required.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-semibold text-white/80 transition hover:text-white"
            >
              Have a question for the lab?
            </Link>
          </div>
          <div className="relative h-[420px] w-full sm:h-[460px]">
            <CardSwap width={420} height={460} cardDistance={68} verticalDistance={78} delay={5200} skewAmount={7}>
              {featuredPosts.map((post) => (
                <Card
                  key={post.slug}
                  customClass="flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/20 bg-slate-950/80 p-6 text-left text-white shadow-[0_45px_85px_-55px_rgba(15,23,42,0.6)] backdrop-blur-lg"
                >
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate-300/80">
                    <span>Fresh Drop</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-6 space-y-3">
                    <h3 className="font-display text-2xl leading-tight text-white">{post.title}</h3>
                    <p className="text-sm text-slate-300">{post.excerpt}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
                    <span>{post.tags[0] ? `#${post.tags[0]}` : "#lab-notes"}</span>
                    <span>Keep Reading -&gt;</span>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </section>
      <div className="mx-auto mt-20 max-w-6xl px-6 lg:px-8">
        <BackstageFeed posts={backstageSummaries} />
      </div>
    </div>
  );
}
