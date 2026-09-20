import { BlogBrowser } from "@/components/blog-browser";
import { Container, PageHeader } from "@/components/ui";
import { siteConfig } from "@/lib/data";
import { getAllPosts, getAllTags } from "@/lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: `Writing and notes from ${siteConfig.name}.`,
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags(posts);

  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Blog"
        title="Notes from the lab notebook"
        description="Tutorials, writing advice, and research practice — rendered from Markdown."
      />
      <BlogBrowser posts={posts} tags={tags} />
    </Container>
  );
}
