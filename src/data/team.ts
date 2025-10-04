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
    role: "Co-founder & AI Software Architect",
    bio: "Freelance full-stack and AI developer delivering 48H prototypes, automation systems, and data-powered tooling for global clients.",
    avatar: withBasePath("/images/team/achkari-mohamed.svg"),
    location: "Tangier, Morocco (GMT+1)",
    specialties: ["Rapid prototyping", "AI model orchestration", "Full-stack development", "Automation systems"],
    summary: [
      "Leads ACH's 48H prototype engagements for RightMind Lab, building production-grade SaaS, desktop, and automation tools that ship within days.",
      "Pairs benchmark-driven model selection with clear stakeholder communication to turn complex briefs into measurable workflow wins for founders and operators."
    ],
    highlights: [
      {
        title: "RightMind - AI Model Navigator",
        description: "Shipped a benchmark-driven recommender surfacing the top LLM fits for each brief, balancing latency, quality, and cost with client-provided metrics."
      },
      {
        title: "RightMind - Super AI Orchestrator",
        description: "Built a multi-model orchestration engine that decomposes prompts, routes subtasks to best-fit APIs, and reunifies responses for enterprise automation."
      },
      {
        title: "RightMind - Launchpad Control Center",
        description: "Delivered a 48H operations console that unifies project health, stakeholder updates, and AI-assisted insights so leadership teams stay in lockstep."
      }
    ],
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/mohamed-achkari-b-/" },
      { label: "Email", href: "mailto:mohamedbegdouri2005@gmail.com" }
    ]
  },
  {
    slug: "achiban-aya",
    name: "Achiban Aya",
    role: "Co-founder & AI Experience Lead",
    bio: "AI engineer and product designer blending LLM orchestration, data storytelling, and interface craft so prototypes feel production-ready from day one.",
    avatar: withBasePath("/images/team/achiban-aya.svg"),
    location: "Casablanca, Morocco (GMT+1)",
    specialties: ["LLM copilots", "AI product design", "Data visualization", "Full-stack prototyping"],
    summary: [
      "ENSAM Casablanca AI engineering candidate pairing research-led UX with FastAPI, React, and Streamlit builds for venture-backed and enterprise teams.",
      "Transforms domain knowledge into NLP, computer vision, and analytics workflows that keep clients' launches measurable, inclusive, and on-brand."
    ],
    highlights: [
      {
        title: "CGI - Consultant Copilot Chatbot",
        description: "Built an internal knowledge assistant on FastAPI combining FAISS, MiniLM, and Mistral-7B embeddings so consultants surface the right guidance in seconds."
      },
      {
        title: "Sentiment Intelligence Benchmarks",
        description: "Ran comparative experiments across SVM, LSTM, and dictionary-based approaches to tune social listening dashboards for marketing stakeholders."
      },
      {
        title: "Safety Vision Pilot Suite",
        description: "Delivered fire detection and emotion classification prototypes with TensorFlow and Streamlit, packaging real-time monitoring dashboards for operational teams."
      }
    ],
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/aya-achiban-235586276?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { label: "Email", href: "mailto:ashiibanayaa36@gmail.com" }
    ]
  },
  {
    slug: "el-mansouri-youssef",
    name: "Youssef El Mansouri",
    role: "Director of AI Delivery",
    bio: "Coordinates RightMind Lab delivery squads, translating executive outcomes into shipped automations and data-rich dashboards.",
    avatar: withBasePath("/images/team/el-mansouri-youssef.svg"),
    location: "Casablanca, Morocco (GMT+1)",
    specialties: ["Delivery leadership", "Applied analytics", "Automation strategy", "AI governance"],
    summary: [
      "Partners with founders and enterprise sponsors to scope high-impact AI programs, align budgets, and keep velocity without sacrificing reliability.",
      "Brings a decade of ops and data science experience to right-size infrastructure, quality bars, and compliance from day zero."
    ],
    highlights: [
      {
        title: "RightMind - Ops Intelligence Hub",
        description: "Rolled out a telemetry stack that aggregates product health, support signals, and automation KPIs so leadership can course-correct in real time."
      },
      {
        title: "RightMind - AI Governance Playbook",
        description: "Authored the guardrails and review rituals that keep multi-model deployments audit-ready across finance, healthcare, and logistics clients."
      }
    ],
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/youssef-el-mansouri" }
    ]
  },
  {
    slug: "benali-salma",
    name: "Salma Benali",
    role: "Product Operations Strategist",
    bio: "Orchestrates discovery, research, and go-to-market loops that turn RightMind Lab prototypes into revenue-ready experiences.",
    avatar: withBasePath("/images/team/salma-benali.svg"),
    location: "Rabat, Morocco (GMT+1)",
    specialties: ["Product operations", "Voice of customer", "Launch readiness", "Revenue enablement"],
    summary: [
      "Runs customer interviews, value mapping, and pricing tests that keep builds grounded in adoption metrics and ROI targets.",
      "Connects design, engineering, and sales enablement so every release ships with clear positioning, onboarding, and success dashboards."
    ],
    highlights: [
      {
        title: "RightMind - Founder Launch Sprints",
        description: "Piloted a two-week GTM program equipping startup clients with positioning decks, onboarding flows, and analytics ready for investor demos."
      },
      {
        title: "RightMind - Customer Signal Engine",
        description: "Built the feedback operations system that distills interviews, support logs, and product analytics into weekly opportunity briefs."
      }
    ],
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/salma-benali" }
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
