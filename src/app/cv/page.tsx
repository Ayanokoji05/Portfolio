import { PrintButton } from "@/components/print-button";
import { Container } from "@/components/ui";
import { aboutData, publicationsData, researchData, siteConfig } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description: `Printable CV for ${siteConfig.name}.`,
};

export default function CVPage() {
  return (
    <Container className="py-16 sm:py-20 print:max-w-none print:px-0">
      <div className="mb-8 flex items-start justify-between gap-4 print:mb-6">
        <div>
          <h1 className="text-4xl font-semibold">{siteConfig.name}</h1>
          <p className="mt-2 text-foreground-secondary">{siteConfig.title}</p>
          <p className="mt-1 text-sm text-foreground-secondary">{siteConfig.email}</p>
        </div>
        <PrintButton />
      </div>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">Profile</h2>
        <p className="text-sm leading-relaxed text-foreground-secondary">{aboutData.bio}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">Education</h2>
        <ul className="space-y-3 text-sm">
          {aboutData.education.map((item) => (
            <li key={item.degree}>
              <strong>{item.degree}</strong>, {item.institution} ({item.year})
              <div className="text-foreground-secondary">{item.description}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">Research</h2>
        <ul className="space-y-3 text-sm">
          {researchData.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong> — {item.status} ({item.period})
              <div className="text-foreground-secondary">{item.description}</div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Selected publications</h2>
        <ul className="space-y-3 text-sm">
          {publicationsData.map((item) => (
            <li key={item.id}>
              {item.authors} ({item.year}). {item.title}. <em>{item.journal}</em>. doi:{item.doi}
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
