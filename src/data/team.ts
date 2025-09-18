export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  avatar: string;
};

export const team: TeamMember[] = [
  {
    name: "Mara Jennings",
    role: "Founding Partner, Strategy",
    bio: "Former head of strategy at two venture-backed startups, Mara leads research and narrative systems that align teams.",
    avatar: "/images/team/mara-jennings.svg"
  },
  {
    name: "Logan Price",
    role: "Founding Partner, Design",
    bio: "Logan crafts expressive design systems and product experiences rooted in user insight and business impact.",
    avatar: "/images/team/logan-price.svg"
  },
  {
    name: "Yuna Tatsu",
    role: "Partner, Growth",
    bio: "Yuna brings a decade of growth experimentation across SaaS and marketplaces, pairing creative with analytics.",
    avatar: "/images/team/yuna-tatsu.svg"
  }
];

export const principles = [
  {
    title: "Outcomes over outputs",
    description: "We measure success by the shifts we unlock for your customers and business, not the artifact we hand over."
  },
  {
    title: "Build in the open",
    description: "Our process is transparent. From FigJam boards to weekly recaps, you always know what is happening and why."
  },
  {
    title: "Craft meets velocity",
    description: "We ship quickly without sacrificing quality--rapid validation paired with meticulous detail."
  }
];

