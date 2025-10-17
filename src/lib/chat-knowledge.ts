import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { principles, team } from "@/data/team";
import { siteConfig } from "@/lib/site-config";

const formatList = (items: string[]) => items.join(", ");

const serviceSummaries = services
  .map(
    (service) =>
      `Service: ${service.name} — ${service.teaser}\nDescription: ${service.description}\nKey deliverables: ${formatList(service.deliverables)}`
  )
  .join("\n\n");

const teamSummaries = team
  .map((member) => {
    const contactDetails = member.links
      ?.map((link) => `${link.label}: ${link.href}`)
      .join(", ");

    const highlights = member.highlights.map((highlight) => `${highlight.title} — ${highlight.description}`).join("; ");

    return [
      `${member.name} (${member.role}, ${member.location})`,
      `Bio: ${member.bio}`,
      `Specialties: ${formatList(member.specialties)}`,
      `Highlights: ${highlights}`,
      contactDetails ? `Contact: ${contactDetails}` : null
    ]
      .filter(Boolean)
      .join("\n");
  })
  .join("\n\n");

const principleSummaries = principles.map((principle) => `${principle.title}: ${principle.description}`).join("\n");

const testimonialSummaries = testimonials
  .map((testimonial) => `"${testimonial.quote}" — ${testimonial.name}, ${testimonial.role} at ${testimonial.company}`)
  .join("\n");

const navigationSummary = siteConfig.navigation.map((item) => `${item.label}: ${item.href}`).join(", ");
const ctaSummary = siteConfig.actions.map((item) => `${item.label} (${item.href})`).join(", ");
const externalLinks = [
  `General contact email: ${siteConfig.links.email}`,
  `Twitter: ${siteConfig.links.twitter}`,
  `LinkedIn: ${siteConfig.links.linkedin}`
].join(", ");

export const chatKnowledgeBase = [
  `Brand: ${siteConfig.name}`,
  `Mission: ${siteConfig.description}`,
  `Navigation: ${navigationSummary}`,
  `Primary CTAs: ${ctaSummary}`,
  `External contact points: ${externalLinks}`,
  `Operating principles:\n${principleSummaries}`,
  `Core services:\n${serviceSummaries}`,
  `Team:\n${teamSummaries}`,
  `Testimonials:\n${testimonialSummaries}`
].join("\n\n");
