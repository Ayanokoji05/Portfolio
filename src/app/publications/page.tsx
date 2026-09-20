import { PublicationsBrowser } from "@/components/publications-browser";
import { Container, PageHeader } from "@/components/ui";
import { siteConfig } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications",
  description: `Papers, journals, and citations from ${siteConfig.name}.`,
};

export default function PublicationsPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Publications"
        title="Papers and preprints"
        description="Filter by venue type or year, switch citation style, and export BibTeX for the current list."
      />
      <PublicationsBrowser />
    </Container>
  );
}
