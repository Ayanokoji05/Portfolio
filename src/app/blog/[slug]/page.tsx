import { Badge, Container } from "@/components/ui";
import { siteConfig } from "@/lib/data";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { format } from "date-fns";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <Container className="py-16 sm:py-20">
      <Link href="/blog" className="text-sm text-accent hover:underline">
        ← All posts
      </Link>
      <p className="mt-6 text-sm text-foreground-secondary">
        {format(new Date(post.date), "MMMM d, yyyy")} · {post.readTime} · {siteConfig.name}
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight">{post.title}</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <article className="prose mt-10">
        <MDXRemote source={post.content} />
      </article>
    </Container>
  );
}
