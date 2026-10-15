import "server-only";
import type { Category, Page, Post, PostInput, PostSummary } from "./types";

/**
 * Cliente da API Spring Boot.
 * Roda só no servidor do Next (Server Components e Server Actions),
 * então o navegador nunca fala direto com a API: sem CORS e, no futuro,
 * o JWT fica guardado em cookie httpOnly no servidor.
 */
const API_URL = (process.env.API_URL ?? "http://localhost:8080/api").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    /** Erros de validação por campo (vindos do GlobalExceptionHandler) */
    public fieldErrors: Record<string, string> = {},
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    throw new ApiError(503, `Não foi possível conectar à API em ${API_URL}. O backend está rodando?`);
  }

  if (!res.ok) {
    // Backend responde no formato ProblemDetail: { detail, errors? }
    const body = await res.json().catch(() => null);
    throw new ApiError(res.status, body?.detail ?? `Erro ${res.status}`, body?.errors ?? {});
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ===================== PÚBLICO =====================

export function getPosts(params: { page?: number; size?: number; category?: string; tag?: string } = {}) {
  const qs = new URLSearchParams();
  qs.set("page", String(params.page ?? 0));
  qs.set("size", String(params.size ?? 10));
  if (params.category) qs.set("category", params.category);
  if (params.tag) qs.set("tag", params.tag);
  return request<Page<PostSummary>>(`/posts?${qs}`);
}

/** Retorna null se o post não existir ou não estiver publicado. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await request<Post>(`/posts/${encodeURIComponent(slug)}`);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}

export function getCategories() {
  return request<Category[]>("/categories");
}

export function getTags() {
  return request<string[]>("/tags");
}

// ===================== ADMIN =====================
// TODO: quando o backend tiver JWT, enviar Authorization: Bearer <token> aqui.

export function adminListPosts() {
  return request<Post[]>("/admin/posts");
}

export async function adminGetPost(id: string): Promise<Post | null> {
  try {
    return await request<Post>(`/admin/posts/${encodeURIComponent(id)}`);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}

export function adminCreatePost(input: PostInput) {
  return request<Post>("/admin/posts", { method: "POST", body: JSON.stringify(input) });
}

export function adminUpdatePost(id: string, input: PostInput) {
  return request<Post>(`/admin/posts/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export function adminDeletePost(id: string) {
  return request<void>(`/admin/posts/${encodeURIComponent(id)}`, { method: "DELETE" });
}
