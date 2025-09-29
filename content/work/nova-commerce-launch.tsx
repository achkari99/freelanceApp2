import { withBasePath } from "@/lib/utils";

export const project = {
  slug: "stockflow-operations",
  title: "StockFlow Operations Platform",
  client: "StockFlow",
  excerpt:
    "Turning fragmented logistics data into a proactive control tower that keeps manufacturing partners stocked and responsive.",
  services: ["48H Prototypes", "Consulting & Digital Transformation", "UI/UX Design"],
  tags: ["Supply chain", "Automation", "Dashboards"],
  categories: ["Platform"],
  timeline: "48 hours to prototype, 6 weeks to MVP",
  status: "case-study",
  hero: {
    image: withBasePath("/images/projects/nova-commerce-hero.svg"),
    alt: "StockFlow supply chain dashboards"
  },
  kpis: [
    { label: "Fulfilment accuracy", value: "+38%" },
    { label: "Manual updates", value: "-71%" },
    { label: "Partner satisfaction", value: "+24 pts" }
  ],
  gallery: [],
  publishedAt: "2024-06-02"
};

export default function NovaCommerceLaunch() {
  return (
    <>
      <h2>Problem</h2>
      <p>
        StockFlow coordinates hundreds of suppliers and downstream retailers, but production updates lived in email threads
        and spreadsheets. Teams reacted to shortages after the fact, and partners lacked confidence in promised ship dates.
      </p>

      <h2>Approach</h2>
      <p>
        ACH interviewed planners, rebuilt the data model, and prototyped a logistics control tower in 48 hours. The experience
        fused live inventory telemetry, predictive replenishment, and AI-authored comms that personalised updates for every
        partner. After validation, we shipped the MVP with collaborative workflows, playbook automation, and integrations to
        ERP and WMS systems.
      </p>

      <h2>Outcome</h2>
      <p>
        Manufacturers now see risks days in advance, partners receive actionable updates automatically, and the ops team trusts
        a single source of truth. StockFlow continues to extend the platform with forecasting and carrier negotiation tools
        built on the same design system.
      </p>
    </>
  );
}
