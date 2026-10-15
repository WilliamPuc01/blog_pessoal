import Link from "next/link";
import { Suspense } from "react";
import PostCard from "@/components/PostCard";
import ApiErrorMessage from "@/components/ApiErrorMessage";
import { PostListSkeleton } from "@/components/Skeletons";
import { getPosts } from "@/lib/api";

async function LatestPosts() {
  try {
    const { content } = await getPosts({ size: 5 });
    if (!content.length) return <p className="text-muted">Nenhum post publicado ainda.</p>;
    return (
      <div className="space-y-4">
        {content.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    );
  } catch (e) {
    return <ApiErrorMessage error={e} />;
  }
}

export default function Home() {
  return (
    <>
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Olá, eu sou o William 👋</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Estudante de Engenharia de Software e desenvolvedor full-stack. Aqui eu registro estudos,
          projetos e o que venho aprendendo.
        </p>
      </section>

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Posts recentes</h2>
          <Link href="/posts" className="text-sm text-accent hover:underline">
            Ver todos →
          </Link>
        </div>
        <Suspense fallback={<PostListSkeleton />}>
          <LatestPosts />
        </Suspense>
      </section>
    </>
  );
}
