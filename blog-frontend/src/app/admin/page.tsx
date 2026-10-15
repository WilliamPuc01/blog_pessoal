import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ApiErrorMessage from "@/components/ApiErrorMessage";
import DeletePostButton from "@/components/DeletePostButton";
import { PostListSkeleton } from "@/components/Skeletons";
import { adminListPosts } from "@/lib/api";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };

async function AdminPostTable() {
  try {
    const posts = await adminListPosts();
    if (!posts.length) return <p className="text-muted">Nenhum post ainda. Crie o primeiro!</p>;

    return (
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Criado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-muted">/{p.slug}</div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      p.status === "PUBLISHED"
                        ? "bg-accent/10 text-accent"
                        : "bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                    }`}
                  >
                    {p.status === "PUBLISHED" ? "Publicado" : "Rascunho"}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted">{formatDate(p.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-4">
                    {p.status === "PUBLISHED" && (
                      <Link href={`/posts/${p.slug}`} className="text-muted hover:underline">Ver</Link>
                    )}
                    <Link href={`/admin/posts/${p.id}/edit`} className="text-accent hover:underline">
                      Editar
                    </Link>
                    <DeletePostButton id={p.id} title={p.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (e) {
    return <ApiErrorMessage error={e} />;
  }
}

export default function AdminPage() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white dark:text-stone-900"
        >
          + Novo post
        </Link>
      </div>
      <Suspense fallback={<PostListSkeleton />}>
        <AdminPostTable />
      </Suspense>
    </>
  );
}
