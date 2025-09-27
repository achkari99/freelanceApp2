import { withBasePath } from "@/lib/utils";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  location: string;
  specialties: string[];
  summary: string[];
  highlights: { title: string; description: string }[];
  links?: { label: string; href: string }[];
};

export const team: TeamMember[] = [
  {
    slug: "achkari-mohamed",
    name: "Achkari Mohamed",
    role: "Founder & Product Architect",
    bio: "Architects 48H builds from sketch to shipped code—bridging product strategy, full-stack engineering, and go-to-market ops.",
    avatar: withBasePath("/images/team/mara-jennings.svg"),
    location: "Casablanca · GMT+1",
    specialties: ["Product strategy", "Full-stack systems", "AI copilots"],
    summary: [
      "Achkari co-founded ACH after a decade shipping venture-backed platforms and internal innovation labs. He owns the first 48 hours of every engagement—mapping product theses, stress-testing scope, and orchestrating the build squad.",
      "He pairs systems thinking with ruthless prioritisation: each prototype lands with a future-proofed architecture map, technical debt budget, and the narrative teams need to win approval." 
    ],
    highlights: [
      {
        title: "RightMind Super AI",
        description: "Designed the agent-control orchestration layer and governance dashboards now used by enterprise partners across LATAM and MENA."
      },
      {
        title: "Atlas Research LabOps",
        description: "Delivered the initial 48H control tower and led the rollout to a fully compliant operations portal in under eight weeks."
      }
    ],
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/achkari-mohamed" },
      { label: "Email", href: "mailto:achiibanayaa36@gmail.com" }
    ]
  },
  {
    slug: "achiban-aya",
    name: "Achiban Aya",
    role: "Design & AI Experience Lead",
    bio: "Shapes the interface, narrative, and AI-assisted workflows that turn fast prototypes into products people champion.",
    avatar: withBasePath("/images/team/yuna-tatsu.svg"),
    location: "London · GMT",
    specialties: ["Product design", "Conversation design", "Design systems"],
    summary: [
      "Aya leads the craft of every ACH delivery—from research sprints and motion design to prompt libraries and handoff kits. Her playbooks align marketing, product, and ops so adoption starts on day one.",
      "She is behind the component systems and AI guardrails that keep ACH builds accessible, inclusive, and production-ready." 
    ],
    highlights: [
      {
        title: "FounderFlow CRM",
        description: "Co-created the investor workflow CRM that founders adopted within one week, complete with AI-written update templates." 
      },
      {
        title: "Insight Copilot",
        description: "Crafted the clinician experience and prompt choreography powering RightMind Lab’s healthcare assistant pilots." 
      }
    ],
    links: [
      { label: "Dribbble", href: "https://dribbble.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/achiban-aya" }
    ]
  }
];

export const principles = [
  {
    title: "Speed with substance",
    description: "Every build is delivered in 48 hours without cutting corners on architecture, accessibility, or handoff documentation."
  },
  {
    title: "Design drives adoption",
    description: "We start with the end user, pairing storytelling and UI craft to create products that feel inevitable and trusted."
  },
  {
    title: "AI as a teammate",
    description: "The lab leverages automation thoughtfully - augmenting teams with copilots, not replacing human decision making."
  }
];

export function getTeamMemberBySlug(slug: string) {
  return team.find((member) => member.slug === slug);
}
