import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Markdown from "@/components/Markdown";
import TagList from "@/components/TagList";
import { TextSkeleton } from "@/components/Skeletons";
import { getPostBySlug } from "@/lib/api";
import { formatDate } from "@/lib/format";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Post não encontrado" };
  return {
    title: post.title,
    description: post.summary ?? undefined,
    openGraph: {
      title: post.title,
      description: post.summary ?? undefined,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

async function PostContent({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted">
          {post.category && (
            <Link href={`/posts?category=${post.category.slug}`} className="font-medium text-accent">
              {post.category.name}
            </Link>
          )}
          <time>{formatDate(post.publishedAt)}</time>
          {post.author && <span>· por {post.author.name}</span>}
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
        {post.summary && <p className="mt-3 text-lg text-muted">{post.summary}</p>}
        <TagList tags={post.tags} className="mt-4" />
      </header>

      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element -- URLs externas arbitrárias
        <img src={post.coverImage} alt="" className="mb-8 w-full rounded-xl border border-border" />
      )}

      <Markdown>{post.content}</Markdown>
    </article>
  );
}

export default function PostPage({ params }: { params: Params }) {
  return (
    <>
      <Link href="/posts" className="mb-6 inline-block text-sm text-muted hover:text-foreground">
        ← Voltar para os posts
      </Link>
      <Suspense fallback={<TextSkeleton />}>
        <PostContent params={params} />
      </Suspense>
    </>
  );
}
