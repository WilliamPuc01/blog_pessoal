import Link from "next/link";

export default function TagList({ tags, className = "" }: { tags: string[]; className?: string }) {
  if (!tags?.length) return null;
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((t) => (
        <li key={t}>
          <Link
            href={`/posts?tag=${t}`}
            className="rounded border border-border px-2 py-0.5 text-xs text-muted hover:text-foreground"
          >
            #{t}
          </Link>
        </li>
      ))}
    </ul>
  );
}
