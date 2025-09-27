import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Rocket, Brain, Layers, Palette, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedHero } from "@/components/home/animated-hero";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { clientLogos } from "@/data/clients";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { projects } from "content/work";

const featuredProjects = projects.filter((project) => project.featured || project.status === "case-study").slice(0, 3);

const serviceIcons = {
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

export default function HomePage() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <AnimatedHero />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/10" aria-hidden />
        <div className="relative z-20 mx-auto flex max-w-6xl flex-col gap-10 px-6 py-28 lg:flex-row lg:items-center lg:px-8">
          <Reveal className="space-y-6 lg:w-2/3" direction="up">
            <Badge className="border-white/30 bg-white/10 text-white backdrop-blur-sm">
              <Sparkles className="mr-2 h-3.5 w-3.5" /> ACH | Better than AI and faster
            </Badge>
            <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Your idea, our prototype in 48 hours.
            </h1>
            <p className="max-w-2xl text-lg text-slate-200">
              We are ACH, the rapid-build unit inside RightMind Lab. In forty-eight hours we deliver clickable or coded prototypes for AI products, SaaS platforms, and mobile experiences, complete with architecture notes so you can scale with confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/start-a-project">
                  Start your prototype for free
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:border-white/60 hover:bg-white/10">
                <Link href="/services">
                  Explore what we build
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </Reveal>
          <Reveal className="grid w-full gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:w-1/3" direction="up" delay={0.12}>
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={0.2 + index * 0.08} className="h-full">
                <Link href={`/work/${project.slug}`} className="group block h-full rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/30 hover:bg-white/10">
                  <p className="text-sm uppercase tracking-wide text-slate-200">{project.client}</p>
                  <p className="mt-2 font-semibold text-white">{project.title}</p>
                  <p className="mt-3 text-sm text-slate-200">{project.excerpt}</p>
                  <div className="mt-4 inline-flex items-center text-sm font-semibold text-white">
                    View build story
                    <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                  </div>
                </Link>
              </Reveal>
            ))}
          </Reveal>
        </div>
      </section>
      <div className="section-divider" aria-hidden />

      <section className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-center justify-between gap-4" direction="up">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Teams scaling with RightMind Lab
          </h2>
          <Link href="/our-work" className="text-sm font-semibold text-slate-700 transition hover:text-sky-600 dark:text-slate-200 dark:hover:text-sky-400">
            See all results
          </Link>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {clientLogos.map((client, index) => (
            <Reveal key={client.name} delay={index * 0.06} className="h-full">
              <Link
                href={client.url}
                className="group inline-flex h-20 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 transition hover:border-slate-300 hover:bg-white/100 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900"
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={120}
                  height={40}
                  sizes="(min-width: 1024px) 120px, 96px"
                  className="max-h-12 w-auto opacity-80 transition group-hover:opacity-100 group-hover:grayscale-0 grayscale"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="space-y-3" direction="up">
            <Badge>What we build</Badge>
            <h2 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
              Prototypes that launch in 48 hours and foundations that scale beyond them.
            </h2>
            <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
              ACH blends creative strategy, technical depth, and design-first execution to launch AI copilots, SaaS platforms, and custom tools faster than internal teams can brief them.
            </p>
          </Reveal>
          <Reveal direction="right" delay={0.12}>
            <Button asChild variant="ghost">
              <Link href="/services">
                All services
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon as keyof typeof serviceIcons];
            const accent = accentClasses[service.accent] ?? "bg-slate-500/10 text-slate-600 dark:text-slate-300";
            return (
              <Reveal key={service.slug} delay={index * 0.1} className="h-full">
                <Card className="group h-full border-slate-200/80 bg-white/90 backdrop-blur transition hover:border-slate-300 hover:shadow-lg dark:border-slate-800/80 dark:bg-slate-900/80">
                  <div className="flex h-full flex-col justify-between gap-6">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-3">
                        {Icon ? (
                          <span className={`flex h-10 w-10 items-center justify-center rounded-full text-slate-900 dark:text-white ${accent}`}>
                            <Icon className="h-5 w-5" aria-hidden />
                          </span>
                        ) : null}
                        <h3 className="font-display text-2xl text-slate-900 transition group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-300">
                          {service.name}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{service.teaser}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{service.description}</p>
                      <ul className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
                        {service.deliverables.map((deliverable) => (
                          <li key={deliverable} className="flex items-center gap-2">
                            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-sky-500" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Badge className="self-start bg-sky-50 text-sky-600 dark:bg-slate-800 dark:text-sky-300">
                      {service.name.split(" ")[0]}
                    </Badge>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>

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
                    <h3 className="font-display text-xl text-slate-900 transition group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-300">
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
