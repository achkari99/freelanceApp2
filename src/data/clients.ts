import { withBasePath } from "@/lib/utils";

export type ClientLogo = {
  name: string;
  logo: string;
  url: string;
};

export const clientLogos: ClientLogo[] = [
  { name: "RightMind Lab", logo: withBasePath("/logos/brightwave.svg"), url: "https://rightmindlab.com" },
  { name: "RightMind AI", logo: withBasePath("/logos/ether-labs.svg"), url: "https://rightmindlab.com/ai" },
  { name: "RightMind Super AI", logo: withBasePath("/logos/north-beacon.svg"), url: "https://rightmindlab.com/superai" },
  { name: "StockFlow", logo: withBasePath("/logos/nova-commerce.svg"), url: "https://rightmindlab.com/stockflow" },
  { name: "LabOps Portal", logo: withBasePath("/logos/voyage-fund.svg"), url: "https://rightmindlab.com/labops" },
  { name: "FounderFlow", logo: withBasePath("/logos/sunset-fm.svg"), url: "https://rightmindlab.com/founderflow" }
];
