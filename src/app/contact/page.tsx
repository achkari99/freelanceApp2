import type { Metadata } from "next";
import ContactContent from "./contact-content";

export const metadata: Metadata = {
  title: "Contact ACH",
  description: "Reach the ACH 48H Prototype team at RightMind Lab to start your next build or ask a question."
};

export default function ContactPage() {
  return <ContactContent />;
}

