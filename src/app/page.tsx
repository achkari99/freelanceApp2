import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedHero } from "@/components/home/animated-hero";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { clientLogos } from "@/data/clients";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { projects } from "content/work";

const featuredProjects = projects.filter((project) => project.featured || project.status === "case-study").slice(0, 3);

export default function HomePage() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
        <div className="absolute inset-0 opacity-40" aria-hidden>
          <AnimatedHero />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-28 lg:flex-row lg:items-center lg:px-8">
          <div className="space-y-8 lg:w-2/3">
            <Badge className="border-white/30 bg-white/10 text-white">
              <Sparkles className="mr-2 h-3.5 w-3.5" /> Boutique studio; bold outcomes
            </Badge>
            <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              We help ambitious teams ship work that resonates--product, brand, and go-to-market in lockstep.
            </h1>
            <p className="max-w-2xl text-lg text-slate-200">
              Resonant Studio is a multidisciplinary partner for founders and marketing leaders. We translate complex stories into experiences and experiments that power growth across the funnel.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/start-a-project">
                  Start a project
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:border-white/50 hover:bg-white/10">
                <Link href="/our-work">
                  See our work
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid w-full gap-4 rounded-3xl bg-white/5 p-6 backdrop-blur lg:w-1/3">
            {featuredProjects.map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`} className="group rounded-2xl bg-white/10 p-4 transition hover:bg-white/20">
                <p className="text-sm uppercase tracking-wide text-slate-200">{project.client}</p>
                <p className="mt-2 font-semibold text-white">{project.title}</p>
                <p className="mt-3 text-sm text-slate-200">{project.excerpt}</p>
                <div className="mt-4 inline-flex items-center text-sm font-semibold text-white">
                  Read the case study
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Trusted by teams shipping what matters
          </h2>
          <Link href="/our-work" className="text-sm font-semibold text-slate-700 hover:text-sky-600 dark:text-slate-200 dark:hover:text-sky-400">
            Explore our case studies
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {clientLogos.map((client) => (
            <Link
              key={client.name}
              href={client.url}
              className="group inline-flex h-20 items-center justify-center rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 transition hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50"
            >
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                width={120}
                height={40}
                sizes="(min-width: 1024px) 120px, 96px"
                className="max-h-12 w-auto opacity-90 transition group-hover:opacity-100"
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <Badge>What we do</Badge>
            <h2 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
              Strategy, design, and growth experiments to move the needle for your product.
            </h2>
            <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
              Every engagement blends vision with velocity. From zero-to-one launches to post-Series-B optimization, we plug in as an integrated extension of your team.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/services">
              All services
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.slug}>
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-3">
                  <h3 className="font-display text-2xl text-slate-900 dark:text-white">{service.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{service.teaser}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
                    {service.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex items-center gap-2">
                        <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-sky-500" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
                <Badge className="bg-sky-50 text-sky-600 dark:bg-slate-800 dark:text-sky-300">
                  {service.name.split(" ")[0]}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge>Case studies</Badge>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-slate-900 dark:text-white">
              Selected work that paired brand and product for measurable outcomes.
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/our-work">
              View all work
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <article key={project.slug} className="group">
              <Link
                href={`/work/${project.slug}`}
                className="block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
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
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <Badge className="border-white/20 bg-white/10 text-white">Testimonials</Badge>
              <h2 className="mt-4 font-display text-3xl tracking-tight">
                Teams work with us because we sweat the details--and the outcomes.
              </h2>
            </div>
            <div className="grid gap-6 lg:w-1/2">
              {testimonials.map((testimonial) => (
                <blockquote key={testimonial.name} className="rounded-3xl border border-white/10 bg-white/5 p-8 text-sm text-slate-200 shadow-lg">
                  <p className="text-base leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                  <footer className="mt-4 text-sm font-semibold text-white">
                    {testimonial.name}
                    <span className="ml-2 text-slate-300">
                      {testimonial.role}, {testimonial.company}
                    </span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-12 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-4">
            <Badge>Ready to move</Badge>
            <h2 className="font-display text-3xl text-slate-900 dark:text-white">Let&apos;s co-create your next chapter.</h2>
            <p className="max-w-xl text-base text-slate-600 dark:text-slate-300">
              Tell us what you&apos;re building and where you&apos;re stuck. We&apos;ll bring a small senior team to synthesize, ship, and measure real outcomes alongside you.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/start-a-project">Start a project</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}





