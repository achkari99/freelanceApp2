const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rightmindlab.com/ach";

export const siteConfig = {
  name: "ACH | 48H Prototype",
  description:
    "ACH is RightMind Lab's rapid prototyping squad. We turn ambitious ideas into AI-ready, design-first products in 48 hours, then scale them into resilient platforms.",
  url: siteUrl,
  ogImage: `${siteUrl.replace(/\/$/, "")}/og-image.svg`,
  links: {
    twitter: "https://twitter.com/rightmindlab",
    linkedin: "https://www.linkedin.com/company/rightmind-lab",
    email: "aa03abm05@gmail.com"
  },
  navigation: [
    { href: "/our-work", label: "Results" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/backstage", label: "Lab Notes" },
    { href: "/contact", label: "Contact" },
    { href: "/search", label: "Search" }
  ],
  actions: [
    { href: "/start-a-project", label: "Start your 48H prototype" }
  ]
} as const;

export type SiteNavigationItem = (typeof siteConfig.navigation)[number];

