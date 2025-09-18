export type Service = {
  slug: string;
  name: string;
  teaser: string;
  description: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: "product-strategy",
    name: "Product Strategy",
    teaser: "Ground your roadmap in outcomes with lean discovery and sharp positioning.",
    description:
      "Research sprints uncover customer truths. We translate them into positioning, roadmaps, and success metrics that align your product team around measurable outcomes.",
    deliverables: ["Research sprints", "Opportunity mapping", "Positioning frameworks", "North-star metrics"]
  },
  {
    slug: "brand-systems",
    name: "Brand Systems",
    teaser: "Build a brand that feels inevitable across every touchpoint.",
    description:
      "We craft expressive design systems, verbal identity, and launch toolkits that empower your team to show up consistently--with room for evolution.",
    deliverables: ["Visual identity", "Messaging architecture", "Design system foundations", "Launch toolkits"]
  },
  {
    slug: "growth-experiments",
    name: "Growth Experiments",
    teaser: "Run experiments that compound customer acquisition and retention.",
    description:
      "Working beside marketing and product teams, we design, ship, and learn from campaigns that move KPIs without compromising brand equity.",
    deliverables: ["Experiment design", "Full-funnel messaging", "Lifecycle automation", "Marketing site optimization"]
  },
  {
    slug: "product-design",
    name: "Product Design",
    teaser: "Design intuitive, emotive digital products that resonate.",
    description:
      "Our product designers embed with your engineers to ship flows, prototypes, and design systems that keep teams shipping with confidence.",
    deliverables: ["Interaction design", "Design systems", "Design QA", "Prototyping"]
  }
];
