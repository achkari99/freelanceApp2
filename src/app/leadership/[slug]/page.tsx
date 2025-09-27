import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { team, getTeamMemberBySlug } from "@/data/team";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LeadershipPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export function generateMetadata({ params }: LeadershipPageProps): Metadata {
  const member = getTeamMemberBySlug(params.slug);
  if (!member) {
    return {
      title: "ACH Leadership"
    };
  }

  return {
    title: `${member.name} · ACH Leadership`,
    description: member.bio,
    openGraph: {
      title: member.name,
      description: member.bio,
      images: [
        {
          url: member.avatar,
          width: 640,
          height: 640,
          alt: member.name
        }
      ]
    }
  };
}

export default function LeadershipProfilePage({ params }: LeadershipPageProps) {
  const member = getTeamMemberBySlug(params.slug);

  if (!member) {
    notFound();
  }

  const profile = member;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <Link
        href="/about"
        className="text-sm font-semibold text-slate-600 transition hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300"
      >
        ← Back to About
      </Link>

      <header className="mt-8 flex flex-col gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
          <div className="h-32 w-32 overflow-hidden rounded-full border border-slate-200 shadow-sm dark:border-slate-700">
            <Image src={profile.avatar} alt={profile.name} width={160} height={160} className="h-full w-full object-cover" />
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <h1 className="font-display text-3xl text-slate-900 dark:text-white">{profile.name}</h1>
              <p className="text-sm uppercase tracking-wide text-sky-600 dark:text-sky-300">{profile.role}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              <Badge>{profile.location}</Badge>
              {profile.specialties.map((specialty) => (
                <Badge key={specialty}>{specialty}</Badge>
              ))}
            </div>
          </div>
        </div>
        {profile.links?.length ? (
          <div className="flex flex-col gap-3 md:items-end">
            {profile.links.map((item) => (
              <Button key={item.label} asChild variant="outline">
                <Link
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        ) : null}
      </header>

      <section className="mt-12 space-y-4">
        {profile.summary.map((paragraph, index) => (
          <p key={index} className="text-base text-slate-600 dark:text-slate-300">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mt-16 space-y-6">
        <h2 className="font-display text-2xl text-slate-900 dark:text-white">Recent Highlights</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {profile.highlights.map((highlight) => (
            <article
              key={highlight.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">{highlight.title}</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{highlight.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-display text-2xl text-slate-900 dark:text-white">Build with {profile.name.split(" ")[0]}</h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Share your idea and we will scope the first 48 hours together. Expect a clear plan, a working prototype, and the proof you need to rally the room.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/start-a-project">Start a project</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Talk to the lab</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
