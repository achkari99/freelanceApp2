import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects, getProjectBySlug, getAdjacentProjects } from "content/work";
import { siteConfig } from "@/lib/site-config";

interface ProjectPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return {};
  }
  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: [
        {
          url: project.hero.image,
          alt: project.hero.alt,
          width: 1600,
          height: 900
        }
      ]
    }
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }
  const { next, previous } = getAdjacentProjects(params.slug);
  const Body = project.body;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    url: `${siteConfig.url.replace(/\/$/, "")}/work/${project.slug}`,
    description: project.excerpt,
    image: new URL(project.hero.image, siteConfig.url).toString(),
    datePublished: project.publishedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name
    }
  };

  return (
    <article className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <Link
        href="/our-work"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Back to our work
      </Link>
      <header className="mt-10 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>{project.client}</Badge>
          {project.status === "coming-soon" ? <Badge className="border-dashed">Coming soon</Badge> : null}
        </div>
        <h1 className="font-display text-4xl tracking-tight text-slate-900 dark:text-white">{project.title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">{project.excerpt}</p>
        <div className="flex flex-wrap gap-4 text-xs uppercase tracking-wide text-slate-400">
          <span>{project.timeline}</span>
          {project.services.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
      </header>
      <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Image
          src={project.hero.image}
          alt={project.hero.alt}
          width={1600}
          height={900}
          sizes="(min-width: 1024px) 900px, 100vw"
          className="h-auto w-full"
          priority
        />
      </div>
      <section className="mt-12 grid gap-8 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:grid-cols-3">
        {project.kpis.length ? (
          project.kpis.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-slate-400">{metric.label}</p>
              <p className="text-3xl font-semibold text-slate-900 dark:text-white">{metric.value}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-300 md:col-span-3">
            This engagement is still in flight. Detailed metrics will be published soon.
          </p>
        )}
      </section>
      <section className="prose prose-slate mx-auto mt-16 max-w-none dark:prose-invert">
        <Body />
      </section>
      {project.gallery.length ? (
        <section className="mt-16 space-y-6">
          <h2 className="font-display text-2xl text-slate-900 dark:text-white">Gallery</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {project.gallery.map((item) => (
              <figure key={item.src} className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="h-auto w-full"
                />
                {item.caption ? (
                  <figcaption className="px-6 py-4 text-sm text-slate-500 dark:text-slate-300">{item.caption}</figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}
      <footer className="mt-20 flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">Next steps</p>
          <h2 className="mt-2 text-2xl text-slate-900 dark:text-white">Let us design your next case study</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/start-a-project">Start a project</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Talk to the team</Link>
          </Button>
        </div>
      </footer>
      <nav className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-8 dark:border-slate-800 md:flex-row md:justify-between">
        {previous ? (
          <Link
            href={`/work/${previous.slug}`}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" aria-hidden />
            Previous: {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300"
          >
            Next: {next.title}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
          </Link>
        ) : null}
      </nav>
      <Script id={`case-study-${project.slug}-ld`} type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
    </article>
  );
}

