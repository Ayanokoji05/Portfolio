import Link from "next/link";
import { Mail, GraduationCap } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/social-icons";
import { siteConfig } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-card-border bg-background-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              {siteConfig.title}. Passionate about advancing knowledge through rigorous research
              and open collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground-secondary hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex items-center gap-3 mb-4">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-card-hover text-foreground-secondary hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-card-hover text-foreground-secondary hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-card-hover text-foreground-secondary hover:text-accent transition-colors"
                aria-label="Twitter"
              >
                <XIcon className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="p-2 rounded-lg hover:bg-card-hover text-foreground-secondary hover:text-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-foreground-secondary">
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-accent transition-colors"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground-secondary">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-foreground-secondary">
            Built with Next.js • Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
