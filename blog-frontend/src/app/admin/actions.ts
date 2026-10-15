"use server";

import { redirect } from "next/navigation";
import { ApiError, adminCreatePost, adminDeletePost, adminUpdatePost } from "@/lib/api";
import type { PostInput, PostStatus } from "@/lib/types";

export interface PostFormState {
  message?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
}

function readForm(formData: FormData): { input: PostInput; values: Record<string, string> } {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const values = {
    title: get("title"),
    slug: get("slug"),
    summary: get("summary"),
    content: String(formData.get("content") ?? ""),
    coverImage: get("coverImage"),
    status: get("status") || "DRAFT",
    categoryName: get("categoryName"),
    tags: get("tags"),
  };

  const input: PostInput = {
    title: values.title,
    slug: values.slug || undefined,
    summary: values.summary || undefined,
    content: values.content,
    coverImage: values.coverImage || undefined,
    status: values.status as PostStatus,
    categoryName: values.categoryName || undefined,
    tags: values.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  };
  return { input, values };
}

function toState(e: unknown, values: Record<string, string>): PostFormState {
  if (e instanceof ApiError) return { message: e.message, fieldErrors: e.fieldErrors, values };
  return { message: "Erro inesperado ao salvar.", values };
}

export async function createPostAction(_prev: PostFormState, formData: FormData): Promise<PostFormState> {
  const { input, values } = readForm(formData);
  try {
    await adminCreatePost(input);
  } catch (e) {
    return toState(e, values);
  }
  redirect("/admin"); // fora do try: redirect funciona lançando uma exceção interna
}

export async function updatePostAction(
  id: string,
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const { input, values } = readForm(formData);
  try {
    await adminUpdatePost(id, input);
  } catch (e) {
    return toState(e, values);
  }
  redirect("/admin");
}

export async function deletePostAction(id: string): Promise<void> {
  await adminDeletePost(id);
  redirect("/admin");
}
