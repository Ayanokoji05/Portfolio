import { AnimatedCard, AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations";
import { HeroBackdrop, TypingEffect } from "@/components/hero";
import { Badge, Container } from "@/components/ui";
import { publicationsData, researchData, siteConfig } from "@/lib/data";
import { getAllPosts } from "@/lib/mdx";
import { ArrowRight, BookOpen, FlaskConical, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function Home() {
  const featuredResearch = researchData.filter((item) => item.status === "Active").slice(0, 2);
  const recentPubs = [...publicationsData].sort((a, b) => b.year - a.year || b.citations - a.citations).slice(0, 3);
  const posts = getAllPosts().slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden">
        <HeroBackdrop />
        <Container className="relative py-20 sm:py-28">
          <AnimatedSection>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-bg px-3 py-1 text-sm text-accent">
              <Sparkles className="h-4 w-4" />
              {siteConfig.title}
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
              {siteConfig.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-secondary sm:text-xl">
              Building methods at the intersection of <TypingEffect /> — from physics-informed models to literature-scale knowledge systems.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/research"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-5 py-2.5 text-sm font-medium text-white"
              >
                Explore research <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-card-border px-5 py-2.5 text-sm font-medium hover:bg-card-hover"
              >
                Get in touch
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <Container className="space-y-20 pb-20">
        <section>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Featured research</h2>
              <p className="mt-2 text-foreground-secondary">Active programs currently in motion.</p>
            </div>
            <Link href="/research" className="text-sm text-accent hover:underline">
              All projects
            </Link>
          </div>
          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {featuredResearch.map((project) => (
              <StaggerItem key={project.id}>
                <div className="glass h-full rounded-2xl border border-card-border p-6">
                  <div className="mb-3 flex items-center gap-2 text-accent">
                    <FlaskConical className="h-4 w-4" />
                    <span className="text-sm">{project.status}</span>
                  </div>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <section>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Recent publications</h2>
              <p className="mt-2 text-foreground-secondary">Selected papers from journals and conferences.</p>
            </div>
            <Link href="/publications" className="text-sm text-accent hover:underline">
              Full list
            </Link>
          </div>
          <div className="space-y-4">
            {recentPubs.map((pub, i) => (
              <AnimatedCard key={pub.id} delay={i * 0.05} className="glass rounded-2xl border border-card-border p-6">
                <p className="text-sm text-foreground-secondary">
                  {pub.year} · {pub.journal} · {pub.citations} citations
                </p>
                <h3 className="mt-2 text-lg font-semibold">{pub.title}</h3>
                <p className="mt-1 text-sm text-foreground-secondary">{pub.authors}</p>
              </AnimatedCard>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">From the blog</h2>
              <p className="mt-2 text-foreground-secondary">Notes on methods, writing, and research practice.</p>
            </div>
            <Link href="/blog" className="text-sm text-accent hover:underline">
              All posts
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="glass rounded-2xl border border-card-border p-6 hover:-translate-y-1 transition-transform">
                <BookOpen className="mb-3 h-5 w-5 text-accent" />
                <p className="text-xs text-foreground-secondary">
                  {format(new Date(post.date), "MMM d, yyyy")} · {post.readTime}
                </p>
                <h3 className="mt-2 font-semibold">{post.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-foreground-secondary">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="gradient-border rounded-3xl p-8 sm:p-12">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-semibold">Let&apos;s collaborate</h2>
              <p className="mt-2 max-w-xl text-foreground-secondary">
                Open to research visits, reviewing, talks, and collaborations on scientific machine learning.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white"
            >
              <Mail className="h-4 w-4" /> Contact
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
