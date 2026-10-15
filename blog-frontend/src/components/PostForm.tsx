"use client";

import { useActionState, useState } from "react";
import type { Post } from "@/lib/types";
import type { PostFormState } from "@/app/admin/actions";
import Markdown from "./Markdown";

interface Props {
  action: (prev: PostFormState, formData: FormData) => Promise<PostFormState>;
  post?: Post;
  submitLabel: string;
}

const input =
  "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent";

export default function PostForm({ action, post, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  const [tab, setTab] = useState<"write" | "preview">("write");

  // Depois de um erro, mantém o que o usuário digitou
  const v = state.values ?? {
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    summary: post?.summary ?? "",
    content: post?.content ?? "",
    coverImage: post?.coverImage ?? "",
    status: post?.status ?? "DRAFT",
    categoryName: post?.category?.name ?? "",
    tags: post?.tags?.join(", ") ?? "",
  };
  const [content, setContent] = useState(v.content);
  const err = (f: string) =>
    state.fieldErrors?.[f] && <p className="mt-1 text-xs text-red-600">{state.fieldErrors[f]}</p>;

  return (
    <form action={formAction} className="space-y-5">
      {state.message && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {state.message}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium">Título *</label>
        <input name="title" defaultValue={v.title} required className={input} />
        {err("title")}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Slug</label>
          <input name="slug" defaultValue={v.slug} placeholder="gerado a partir do título" className={input} />
          {err("slug")}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Status</label>
          <select name="status" defaultValue={v.status} className={input}>
            <option value="DRAFT">Rascunho</option>
            <option value="PUBLISHED">Publicado</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Categoria</label>
          <input name="categoryName" defaultValue={v.categoryName} placeholder="ex: Java" className={input} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Tags</label>
          <input name="tags" defaultValue={v.tags} placeholder="spring, mongodb" className={input} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Resumo</label>
        <textarea name="summary" defaultValue={v.summary} rows={2} className={input} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">URL da imagem de capa</label>
        <input name="coverImage" type="url" defaultValue={v.coverImage} className={input} />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="text-sm font-medium">Conteúdo (Markdown) *</label>
          <div className="flex gap-1 text-xs">
            {(["write", "preview"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded px-2 py-1 ${tab === t ? "bg-accent/10 text-accent" : "text-muted"}`}
              >
                {t === "write" ? "Escrever" : "Visualizar"}
              </button>
            ))}
          </div>
        </div>
        {/* textarea fica sempre no DOM para ser enviada no form */}
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={16}
          required
          className={`${input} font-mono ${tab === "preview" ? "hidden" : ""}`}
        />
        {tab === "preview" && (
          <div className="min-h-64 rounded-lg border border-border bg-card p-4">
            {content.trim() ? <Markdown>{content}</Markdown> : <p className="text-sm text-muted">Nada para mostrar.</p>}
          </div>
        )}
        {err("content")}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white disabled:opacity-50 dark:text-stone-900"
      >
        {pending ? "Salvando..." : submitLabel}
      </button>
    </form>
  );
}
