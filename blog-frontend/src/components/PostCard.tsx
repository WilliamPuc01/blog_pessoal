import Link from "next/link";
import type { PostSummary } from "@/lib/types";
import { formatDate } from "@/lib/format";
import TagList from "./TagList";

export default function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted">
        {post.category && (
          <Link
            href={`/posts?category=${post.category.slug}`}
            className="rounded-full bg-accent/10 px-2 py-0.5 font-medium text-accent"
          >
            {post.category.name}
          </Link>
        )}
        <time>{formatDate(post.publishedAt)}</time>
      </div>
      <h2 className="text-lg font-semibold leading-snug">
        <Link href={`/posts/${post.slug}`} className="hover:text-accent">
          {post.title}
        </Link>
      </h2>
      {post.summary && <p className="mt-2 text-sm text-muted">{post.summary}</p>}
      <TagList tags={post.tags} className="mt-3" />
    </article>
  );
}
