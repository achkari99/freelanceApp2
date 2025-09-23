import { withBasePath } from "@/lib/utils";

export type ClientLogo = {
  name: string;
  logo: string;
  url: string;
};

export const clientLogos: ClientLogo[] = [
  { name: "Brightwave", logo: withBasePath("/logos/brightwave.svg"), url: "https://brightwave.ai" },
  { name: "North Beacon", logo: withBasePath("/logos/north-beacon.svg"), url: "https://northbeacon.com" },
  { name: "Nova Commerce", logo: withBasePath("/logos/nova-commerce.svg"), url: "https://novacommerce.io" },
  { name: "Ether Labs", logo: withBasePath("/logos/ether-labs.svg"), url: "https://etherlabs.xyz" },
  { name: "Voyage Fund", logo: withBasePath("/logos/voyage-fund.svg"), url: "https://voyagefund.vc" },
  { name: "Sunset FM", logo: withBasePath("/logos/sunset-fm.svg"), url: "https://sunset.fm" }
];
