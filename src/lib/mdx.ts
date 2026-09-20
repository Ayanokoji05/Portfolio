import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readTime: string;
};

export type BlogPost = BlogPostMeta & { content: string };

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function parsePost(slug: string, raw: string): BlogPost {
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    excerpt: String(data.excerpt ?? ""),
    readTime: data.readTime ? String(data.readTime) : readingTime(content),
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { content, ...meta } = parsePost(slug, raw);
      void content;
      return meta;
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const file = [".mdx", ".md"]
    .map((ext) => path.join(BLOG_DIR, `${slug}${ext}`))
    .find((candidate) => fs.existsSync(candidate));
  if (!file) return null;
  return parsePost(slug, fs.readFileSync(file, "utf8"));
}

export function getAllTags(posts: BlogPostMeta[] = getAllPosts()) {
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
}
