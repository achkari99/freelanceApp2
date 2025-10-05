export type Service = {
  slug: string;
  name: string;
  teaser: string;
  description: string;
  deliverables: string[];
  icon: string;
  accent: string;
  animation: string;
  background: string;
};

export const services: Service[] = [
  {
    slug: "48h-prototypes",
    name: "48H Prototypes",
    teaser: "Launch-ready MVPs for web, mobile, or SaaS in two days flat.",
    description:
      "We map the core journey, ship a clickable or coded prototype in 48 hours, and hand you the assets, technical notes, and roadmap to take it live.",
    deliverables: ["Experience mapping", "Clickable or coded prototype", "Tech + scaling plan", "Roadmap workshop"],
    icon: "Rocket",
    accent: "sky",
    animation: "prototype",
    background: "sky"
  },
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    teaser: "Intelligent assistants, automation, and orchestration built for your stack.",
    description:
      "From chat copilots to custom NLP pipelines, we instrument data flows, connect to best-in-class models, and design guardrails so AI stays on-brand and on-task.",
    deliverables: ["AI opportunity audit", "Conversation + workflow design", "Model orchestration", "Analytics + governance"],
    icon: "Brain",
    accent: "violet",
    animation: "ai",
    background: "violet"
  },
  {
    slug: "fullstack-apps",
    name: "Web & Mobile Development",
    teaser: "Robust apps that evolve from prototype to production without rewrite.",
    description:
      "ACH builds scalable SaaS, management systems, and internal tools with modern cloud infrastructure, automated testing, and observability baked in.",
    deliverables: ["Architecture blueprints", "Full-stack implementation", "CI/CD + infrastructure", "Performance monitoring"],
    icon: "Layers",
    accent: "emerald",
    animation: "fullstack",
    background: "emerald"
  },
  {
    slug: "software-development",
    name: "Software Development",
    teaser: "End-to-end delivery of resilient platforms and integrations.",
    description:
      "We design modular architectures, harden delivery pipelines, and leave maintainable codebases that scale with your roadmap.",
    deliverables: [
      "Architecture & technical specifications",
      "Modular feature implementation",
      "Automated QA & DevOps workflows",
      "Knowledge transfer & onboarding"
    ],
    icon: "Code",
    accent: "cyan",
    animation: "fullstack",
    background: "fullstack"
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    teaser: "Design-first interfaces that convert, delight, and scale with you.",
    description:
      "We pair rapid ideation with component libraries, motion, and accessibility best practices to deliver interfaces people trust from day one.",
    deliverables: ["Product vision boards", "Design systems", "Interactive prototypes", "Design QA + documentation"],
    icon: "Palette",
    accent: "amber",
    animation: "design",
    background: "amber"
  },
  {
    slug: "saas-iaas-launches",
    name: "SaaS / IaaS Launches",
    teaser: "Operationalize cloud-native products with multi-tenant tooling.",
    description:
      "We configure subscription infrastructure, metering, and support layers so you can ship managed services with confidence.",
    deliverables: [
      "Tenant-aware cloud architecture",
      "Billing & metering integrations",
      "Observability & SLO dashboards",
      "Runbooks and escalation workflows"
    ],
    icon: "Cloud",
    accent: "indigo",
    animation: "ai",
    background: "ai"
  },
  {
    slug: "consulting-transformation",
    name: "Consulting & Digital Transformation",
    teaser: "Strategic guidance on AI, cloud, and automation adoption across teams.",
    description:
      "RightMind Lab partners leverage our advisory sprints to align leadership, select platforms, and upskill teams so transformation happens with confidence.",
    deliverables: ["Capability assessment", "Technology roadmap", "Team enablement", "Launch + change management"],
    icon: "Compass",
    accent: "rose",
    animation: "consulting",
    background: "rose"
  }
];
