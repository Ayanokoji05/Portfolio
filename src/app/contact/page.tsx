import { ContactForm } from "@/components/contact-form";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/social-icons";
import { Container, PageHeader } from "@/components/ui";
import { siteConfig } from "@/lib/data";
import { Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} for research collaborations and speaking.`,
};

export default function ContactPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Contact"
        title="Start a conversation"
        description="Use the form for collaborations, reviews, and talks. Direct email and profiles are listed alongside office details."
      />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <ContactForm />
        <aside className="space-y-6">
          <div className="glass rounded-2xl border border-card-border p-6">
            <h2 className="font-semibold">Office</h2>
            <p className="mt-3 flex items-start gap-2 text-sm text-foreground-secondary">
              <MapPin className="mt-0.5 h-4 w-4 text-accent" />
              Department of Computer Science
              <br />
              Research Building, Room 412
              <br />
              India
            </p>
            <a href={`mailto:${siteConfig.email}`} className="mt-4 inline-flex items-center gap-2 text-sm text-accent">
              <Mail className="h-4 w-4" />
              {siteConfig.email}
            </a>
            <div className="mt-4 flex gap-3">
              <a href={siteConfig.social.github} className="text-foreground-secondary hover:text-accent" aria-label="GitHub">
                <GitHubIcon className="h-5 w-5" />
              </a>
              <a href={siteConfig.social.linkedin} className="text-foreground-secondary hover:text-accent" aria-label="LinkedIn">
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a href={siteConfig.social.twitter} className="text-foreground-secondary hover:text-accent" aria-label="Twitter">
                <XIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-card-border">
            <iframe
              title="Campus map"
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.18%2C28.54%2C77.22%2C28.57&layer=mapnik"
            />
          </div>
        </aside>
      </div>
    </Container>
  );
}
