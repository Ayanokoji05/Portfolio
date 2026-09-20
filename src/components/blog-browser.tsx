"use client";

import { Badge } from "@/components/ui";
import type { BlogPostMeta } from "@/lib/mdx";
import Link from "next/link";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

const PAGE_SIZE = 4;

export function BlogBrowser({ posts, tags }: { posts: BlogPostMeta[]; tags: string[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesTag = tag === "All" || post.tags.includes(tag);
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((item) => item.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [posts, query, tag]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-secondary" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search posts"
            className="w-full rounded-xl border border-card-border bg-background py-2.5 pl-10 pr-3 text-sm outline-none focus:border-accent"
          />
        </label>
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        {["All", ...tags].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setTag(item);
              setPage(1);
            }}
            className={
              tag === item
                ? "rounded-full bg-accent px-3 py-1.5 text-sm text-white"
                : "rounded-full bg-tag-bg px-3 py-1.5 text-sm text-tag-text"
            }
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-6">
        {visible.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass block rounded-2xl border border-card-border p-6 transition-transform hover:-translate-y-1"
          >
            <p className="text-sm text-foreground-secondary">
              {format(new Date(post.date), "MMMM d, yyyy")} · {post.readTime}
            </p>
            <h2 className="mt-2 text-2xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-foreground-secondary">{post.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </Link>
        ))}
        {visible.length === 0 ? <p className="text-foreground-secondary">No posts found.</p> : null}
      </div>
      {pages > 1 ? (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPage(item)}
              className={
                item === current
                  ? "h-9 w-9 rounded-lg bg-accent text-sm text-white"
                  : "h-9 w-9 rounded-lg border border-card-border text-sm"
              }
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
