import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import MagicBento, { type BentoCardProps } from "~/bento";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTeamMemberBySlug, team } from "@/data/team";

const labHighlights = [
  "48-hour strike teams blend product, design, and engineering so ideas ship fast.",
  "We weave AI copilots and automation into every prototype from day zero.",
  "Casablanca HQ with leads distributed across North America and Europe."
] as const;

const Lanyard = dynamic(() => import("~/3ala9a"), {
  ssr: false,
  loading: () => (
    <div className="h-[280px] w-full rounded-3xl border border-slate-800/50 bg-slate-900/40" />
  )
});

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
    title: `${member.name} - ACH Leadership`,
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
  const [leadParagraph, ...restSummary] = profile.summary;
  const narrative = restSummary.length > 0 ? restSummary : leadParagraph ? [leadParagraph] : [];
  const highlightEntries = profile.highlights;
  const firstName = profile.name.split(" ")[0] ?? profile.name;

  const specialtyLine = profile.specialties.slice(0, 2).join(" | ");
  const badgeFooter = specialtyLine || profile.location;
  const accent = "#38bdf8";

  const cards: BentoCardProps[] = [
    {
      label: "Lab Leadership",
      className: "md:col-span-2 md:row-span-2",
      style: {
        aspectRatio: "auto",
        minHeight: "320px",
        background: "linear-gradient(135deg, rgba(8,17,36,0.95), rgba(11,57,84,0.7))",
        borderColor: "rgba(148, 163, 184, 0.25)"
      },
      body: (
        <div className="flex h-full flex-col justify-between gap-6">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
            <div className="h-24 w-24 overflow-hidden rounded-full border border-white/20 shadow-lg">
              <Image src={profile.avatar} alt={profile.name} width={160} height={160} className="h-full w-full object-cover" />
            </div>
            <div className="space-y-3">
              <h2 className="font-display text-2xl text-white">{profile.name}</h2>
              <p className="text-xs uppercase tracking-[0.35em] text-sky-300">{profile.role}</p>
              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                <Badge className="border-white/20 bg-white/10 text-white">{profile.location}</Badge>
                {profile.specialties.map((specialty) => (
                  <Badge key={specialty} className="border-white/20 bg-white/10 text-white">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          {profile.links?.length ? (
            <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
              {profile.links.map((item) => (
                <Button
                  key={item.label}
                  asChild
                  variant="outline"
                  className="border-white/30 bg-white/5 text-white transition hover:border-sky-400 hover:text-sky-200"
                >
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
        </div>
      )
    },
    {
      label: "Lab Credentials",
      className: "md:col-span-2 md:row-span-2",
      style: {
        aspectRatio: "auto",
        minHeight: "320px",
        background: "radial-gradient(circle at top, rgba(56,189,248,0.28), transparent 60%), rgba(6,8,20,0.92)",
        borderColor: "rgba(56, 189, 248, 0.3)"
      },
      body: (
        <div className="flex h-full w-full flex-col items-center justify-between gap-6">
          <div className="w-full flex-1">
            <Lanyard
              height="100%"
              width="100%"
              className="h-[260px] w-full"
              badgeTitle={profile.name}
              badgeSubtitle={profile.role}
              badgeFooter={badgeFooter}
              accentColor={accent}
            />
          </div>
          <p className="text-center text-[0.65rem] uppercase tracking-[0.4em] text-slate-300">
            ACH 48H badge - drag to explore
          </p>
        </div>
      )
    },
    {
      label: "Field Notes",
      className: "md:col-span-2 xl:col-span-4",
      style: {
        aspectRatio: "auto",
        minHeight: "260px",
        background: "linear-gradient(135deg, rgba(9,12,24,0.95), rgba(14,26,45,0.8))",
        borderColor: "rgba(99, 102, 241, 0.25)"
      },
      body: (
        <div className="flex h-full flex-col justify-between gap-4 text-slate-100">
          <div className="space-y-3 text-sm leading-relaxed text-slate-200">
            {narrative.length ? (
              narrative.map((paragraph, index) => (
                <p key={index} className="text-sm leading-relaxed text-slate-100/85">
                  {paragraph}
                </p>
              ))
            ) : leadParagraph ? (
              <p className="text-sm text-slate-200">{leadParagraph}</p>
            ) : (
              <p className="text-sm text-slate-200">
                {profile.name} helps ACH deliver production-grade prototypes within 48 hours, then scales them into resilient platforms.
              </p>
            )}
          </div>
          <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Workflow rituals</span>
        </div>
      )
    },
    {
      label: "Recent Highlights",
      className: "md:col-span-2 md:row-span-2",
      style: {
        aspectRatio: "auto",
        minHeight: "300px",
        background: "linear-gradient(135deg, rgba(12,20,40,0.9), rgba(20,70,90,0.75))",
        borderColor: "rgba(56, 189, 248, 0.25)"
      },
      body: (
        <div className="flex h-full flex-col justify-between gap-4">
          {highlightEntries.length ? (
            <ul className="space-y-3">
              {highlightEntries.map((highlight) => (
                <li key={highlight.title} className="rounded-xl border border-white/10 bg-white/5 p-4 text-left">
                  <p className="text-sm font-semibold text-white">{highlight.title}</p>
                  <p className="mt-2 text-xs text-slate-200">{highlight.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-200">Shipping highlights will appear here soon.</p>
          )}
          <span className="text-xs uppercase tracking-[0.35em] text-slate-400">48H shipping log</span>
        </div>
      )
    },
    {
      label: "Lab Principles",
      className: "md:col-span-2",
      style: {
        aspectRatio: "auto",
        minHeight: "220px",
        background: "linear-gradient(135deg, rgba(9,13,26,0.9), rgba(30,41,59,0.75))",
        borderColor: "rgba(148, 163, 184, 0.2)"
      },
      body: (
        <div className="flex h-full flex-col justify-between gap-3 text-sm text-slate-200">
          <ul className="space-y-3">
            {labHighlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-sky-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Inside the 48H lab</span>
        </div>
      )
    },
    {
      label: `Build with ${firstName}`,
      className: "md:col-span-2",
      style: {
        aspectRatio: "auto",
        minHeight: "220px",
        background: "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(12,74,110,0.65))",
        borderColor: "rgba(56, 189, 248, 0.35)"
      },
      body: (
        <div className="flex h-full flex-col justify-between gap-4 text-slate-100">
          <p className="text-sm leading-relaxed text-slate-100">
            Kick off a 48-hour sprint with ACH and {firstName}. Expect a working prototype, environment playbooks,
            and the proof you need to rally the room.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="sm" className="bg-sky-500 text-white hover:bg-sky-400">
              <Link href="/start-a-project">Start a project</Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="border-white/40 text-white hover:border-sky-300">
              <Link href="/contact">Talk to the lab</Link>
            </Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="relative overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-15%] top-[-25%] h-[380px] w-[380px] rounded-full bg-sky-500/20 blur-[160px]" />
        <div className="absolute right-[-10%] top-[30%] h-[340px] w-[340px] rounded-full bg-cyan-500/25 blur-[160px]" />
        <div className="absolute bottom-[-25%] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-slate-900/70 blur-[180px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-sky-300"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to About
        </Link>

        <div className="mt-10 max-w-3xl space-y-4 text-center text-white sm:text-left">
          <Badge className="mx-auto w-max border-white/20 bg-white/10 text-white/90 backdrop-blur sm:mx-0">ACH Leadership</Badge>
          <h1 className="font-display text-3xl tracking-tight sm:text-4xl">{profile.name}</h1>
          <p className="text-base text-slate-200 sm:text-lg">
            {leadParagraph ??
              `${profile.name} anchors ACH's 48H prototype lab - pairing strategy, design, and engineering to ship production-grade proof on pace.`}
          </p>
        </div>

        <div className="mt-10 flex justify-center px-2 sm:mt-12 sm:px-0">
          <MagicBento
            cards={cards}
            enableStars={false}
            enableSpotlight
            enableBorderGlow
            enableTilt
            glowColor="56,189,248"
            gridClassName="w-full auto-rows-[minmax(0,1fr)] gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-4"
            useDefaultLayout={false}
          />
        </div>
      </div>
    </div>
  );
}


