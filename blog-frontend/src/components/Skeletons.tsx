export function PostListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-32 animate-pulse rounded-xl border border-border bg-card" />
      ))}
    </div>
  );
}

export function TextSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-8 w-2/3 animate-pulse rounded bg-border" />
      <div className="h-4 w-1/3 animate-pulse rounded bg-border" />
      <div className="mt-8 h-64 animate-pulse rounded bg-border" />
    </div>
  );
}
