import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StagedHero } from "@/components/home/staged-hero";
import { HeroFeaturedList, type HeroHighlightCard } from "@/components/home/hero-featured-list";
import { ProcessSteps } from "@/components/home/process-steps";
import { StagedServices } from "@/components/home/staged-services";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/data/testimonials";
import { projects } from "content/work";

const featuredProjects = projects.filter((project) => project.featured || project.status === "case-study").slice(0, 3);
const heroHighlightCards: HeroHighlightCard[] = [
  ...featuredProjects.map((projectEntry, index) => {
    const { body: _unusedBody, ...project } = projectEntry;
    void _unusedBody;

    return {
      id: project.slug,
      title: project.title,
      client: project.client,
      timeline: project.timeline,
      excerpt: project.excerpt,
      tags: project.tags,
      href: `/work/${project.slug}`,
      hoverTone: (["sky", "violet", "emerald"] as const)[index % 3]
    };
  }),
  {
    id: "ai-prototype-kits",
    title: "AI prototype kits",
    client: "RightMind Lab",
    timeline: "48 hour build",
    excerpt: "Pre-built conversational flows, data hooks, and UI shells we customize in a single sprint.",
    tags: ["AI UX", "Rapid build", "Playbooks"],
    href: "/services",
    hoverTone: "violet"
  },
  {
    id: "founder-sprint-labs",
    title: "Founder sprint labs",
    client: "Launch partners",
    timeline: "1 week handoff",
    excerpt: "Product strategy, prototype, and revenue experiments bundled so founders can pitch with confidence.",
    tags: ["Product strategy", "Testing", "Pitch decks"],
    href: "/start-a-project",
    hoverTone: "amber"
  },
  {
    id: "fractional-product-pod",
    title: "Fractional product pod",
    client: "Growth teams",
    timeline: "Monthly slate",
    excerpt: "Design, engineering, and AI ops on tap to extend your roadmap without hiring full-time.",
    tags: ["Fractional team", "Roadmap", "AI ops"],
    href: "/contact",
    hoverTone: "emerald"
  }
];

export default function HomePage() {
  return (
    <div className="space-y-24 pb-24">
      <StagedHero />
      <HeroFeaturedList cards={heroHighlightCards} />
      <ProcessSteps />
      <StagedServices />

      <section className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal direction="up">
            <Badge>Proof</Badge>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-slate-900 dark:text-white">
              Prototypes that graduate into production products.
            </h2>
          </Reveal>
          <Reveal direction="right" delay={0.12}>
            <Button asChild variant="outline">
              <Link href="/our-work">
                View all work
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.1} className="h-full">
              <article className="group h-full">
                <Link
                  href={`/work/${project.slug}`}
                  className="block h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={project.hero.image}
                      alt={project.hero.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                    <h3 className="font-display text-xl text-slate-950 transition group-hover:text-sky-600 dark:text-slate-50 dark:group-hover:text-sky-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{project.excerpt}</p>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <Reveal className="lg:w-1/2" direction="up">
              <Badge className="border-white/20 bg-white/10 text-white">Testimonials</Badge>
              <h2 className="mt-4 font-display text-3xl tracking-tight">
                Clients trust ACH when speed, craft, and reliability all matter.
              </h2>
            </Reveal>
            <div className="grid gap-6 lg:w-1/2">
              {testimonials.map((testimonial, index) => (
                <Reveal key={testimonial.name} delay={index * 0.1} className="h-full">
                  <blockquote className="rounded-3xl border border-white/10 bg-white/5 p-8 text-sm text-slate-200 shadow-lg backdrop-blur">
                    <p className="text-base leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                    <footer className="mt-4 flex items-center justify-between text-sm font-semibold text-white">
                      <span>{testimonial.name}</span>
                      <span className="text-slate-300">{testimonial.role}, {testimonial.company}</span>
                    </footer>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-8 rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-800 p-12 text-white shadow-xl dark:border-slate-800">
          <Reveal className="space-y-4" direction="up">
            <Badge className="border-white/20 bg-white/10 text-white">Get started</Badge>
            <h2 className="font-display text-3xl">Ready for a 48 hour prototype?</h2>
            <p className="max-w-xl text-base text-slate-100">
              Share what you are building and we will schedule a kickoff within hours. You will receive strategy notes, design assets, and a working prototype you can demo or pitch immediately.
            </p>
            <p className="text-sm text-slate-300">
              Prefer email? Reach us directly at <a className="underline" href="mailto:achiibanayaa36@gmail.com">achiibanayaa36@gmail.com</a>.
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-4 sm:flex-row" direction="up" delay={0.12}>
            <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
              <Link href="/start-a-project">Request your 48 hour prototype</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/70 text-white hover:border-white hover:bg-white/10">
              <Link href="/contact">Talk to the lab</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

