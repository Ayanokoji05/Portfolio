import { AnimatedSection } from "@/components/animations";
import { SkillGrid } from "@/components/skill-grid";
import { Container, PageHeader } from "@/components/ui";
import { aboutData, siteConfig } from "@/lib/data";
import { Award, Download, GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: `Biography, education, skills, and awards for ${siteConfig.name}.`,
};

export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="About"
        title="Researcher, writer, and collaborator"
        description="A short snapshot of my academic path, methods I use, and the work I care about most."
      />

      <AnimatedSection className="mb-16 max-w-3xl space-y-4 text-lg leading-relaxed text-foreground-secondary">
        {aboutData.bio.split("\n\n").map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
        <Link
          href="/cv"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white"
        >
          <Download className="h-4 w-4" /> Download CV
        </Link>
      </AnimatedSection>

      <AnimatedSection className="mb-16">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold">
          <GraduationCap className="h-5 w-5 text-accent" /> Education
        </h2>
        <ol className="relative space-y-8 border-l border-card-border pl-6">
          {aboutData.education.map((item) => (
            <li key={item.degree} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full bg-accent" />
              <p className="text-sm text-accent">{item.year}</p>
              <h3 className="mt-1 text-lg font-semibold">{item.degree}</h3>
              <p className="text-sm text-foreground-secondary">{item.institution}</p>
              <p className="mt-2 text-sm text-foreground-secondary">{item.description}</p>
            </li>
          ))}
        </ol>
      </AnimatedSection>

      <AnimatedSection className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">Skills</h2>
        <SkillGrid />
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold">
          <Award className="h-5 w-5 text-accent" /> Awards
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {aboutData.awards.map((award) => (
            <li key={award} className="glass rounded-2xl border border-card-border p-5 text-sm leading-relaxed">
              {award}
            </li>
          ))}
        </ul>
      </AnimatedSection>
    </Container>
  );
}
