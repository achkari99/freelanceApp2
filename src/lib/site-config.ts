const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://resonant.studio";

export const siteConfig = {
  name: "Resonant Studio",
  description:
    "Resonant Studio is a boutique product and brand partner crafting resonant digital experiences for ambitious teams.",
  url: siteUrl,
  ogImage: `${siteUrl.replace(/\/$/, "")}/og-image.svg`,
  links: {
    twitter: "https://twitter.com/resonant",
    linkedin: "https://www.linkedin.com/company/resonant-studio",
    email: "hello@resonant.studio"
  },
  navigation: [
    { href: "/our-work", label: "Our Work" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/backstage", label: "Backstage" },
    { href: "/contact", label: "Contact" },
    { href: "/search", label: "Search" }
  ],
  actions: [
    { href: "/start-a-project", label: "Start a project" }
  ]
} as const;

export type SiteNavigationItem = (typeof siteConfig.navigation)[number];
