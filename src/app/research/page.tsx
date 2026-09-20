import { ResearchGrid } from "@/components/research-grid";
import { Badge, Container, PageHeader } from "@/components/ui";
import { researchInterests, siteConfig } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research",
  description: `Research projects and interests from ${siteConfig.name}.`,
};

export default function ResearchPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Research"
        title="Projects and collaborations"
        description="Active and completed programs spanning scientific machine learning, literature mining, fairness, and forecasting."
      />
      <div className="mb-10">
        <h2 className="mb-4 text-lg font-semibold">Research interests</h2>
        <div className="flex flex-wrap gap-2">
          {researchInterests.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      </div>
      <ResearchGrid />
    </Container>
  );
}
