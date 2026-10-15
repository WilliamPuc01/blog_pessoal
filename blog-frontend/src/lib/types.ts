// Espelha os DTOs do backend (blog-backend/.../dto)

export type PostStatus = "DRAFT" | "PUBLISHED";

export interface Author {
  id: string;
  name: string;
}

export interface Category {
  name: string;
  slug: string;
}

/** PostSummaryDTO: item da listagem pública */
export interface PostSummary {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  coverImage: string | null;
  author: Author | null;
  category: Category | null;
  tags: string[];
  publishedAt: string | null;
}

/** PostResponseDTO: detalhe do post */
export interface Post extends PostSummary {
  content: string;
  status: PostStatus;
  createdAt: string | null;
  updatedAt: string | null;
}

/** PageResponseDTO */
export interface Page<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

/** PostRequestDTO: corpo de criação/edição */
export interface PostInput {
  title: string;
  slug?: string;
  summary?: string;
  content: string;
  coverImage?: string;
  status: PostStatus;
  categoryName?: string;
  categorySlug?: string;
  tags: string[];
}
