import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import ApiErrorMessage from "@/components/ApiErrorMessage";
import { PostListSkeleton } from "@/components/Skeletons";
import { getCategories, getPosts, getTags } from "@/lib/api";

export const metadata: Metadata = { title: "Posts" };

type SearchParams = Promise<{ page?: string; category?: string; tag?: string }>;

async function PostList({ searchParams }: { searchParams: SearchParams }) {
  const { page, category, tag } = await searchParams;
  const pageNum = Math.max(Number(page) || 0, 0);

  try {
    const data = await getPosts({ page: pageNum, size: 10, category, tag });
    return (
      <>
        {(category || tag) && (
          <p className="mb-4 text-sm text-muted">
            Filtrando por {category ? `categoria "${category}"` : `tag "#${tag}"`} ·{" "}
            <Link href="/posts" className="text-accent hover:underline">limpar</Link>
          </p>
        )}
        {data.content.length ? (
          <div className="space-y-4">
            {data.content.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        ) : (
          <p className="text-muted">Nenhum post encontrado.</p>
        )}
        <Pagination page={data.page} totalPages={data.totalPages} query={{ category, tag }} />
      </>
    );
  } catch (e) {
    return <ApiErrorMessage error={e} />;
  }
}

async function Sidebar() {
  try {
    const [categories, tags] = await Promise.all([getCategories(), getTags()]);
    return (
      <div className="space-y-8 text-sm">
        {categories.length > 0 && (
          <div>
            <h3 className="mb-2 font-semibold">Categorias</h3>
            <ul className="space-y-1">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/posts?category=${c.slug}`} className="text-muted hover:text-foreground">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {tags.length > 0 && (
          <div>
            <h3 className="mb-2 font-semibold">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <Link key={t} href={`/posts?tag=${t}`} className="text-muted hover:text-foreground">
                  #{t}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch {
    return null; // a lista principal já mostra o erro
  }
}

export default function PostsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Posts</h1>
      <div className="grid gap-10 md:grid-cols-[1fr_200px]">
        <div>
          <Suspense fallback={<PostListSkeleton />}>
            <PostList searchParams={searchParams} />
          </Suspense>
        </div>
        <aside>
          <Suspense fallback={null}>
            <Sidebar />
          </Suspense>
        </aside>
      </div>
    </>
  );
}
