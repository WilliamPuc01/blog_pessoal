import type { Metadata } from "next";
import PostForm from "@/components/PostForm";
import { createPostAction } from "../../actions";

export const metadata: Metadata = { title: "Novo post", robots: { index: false } };

export default function NewPostPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Novo post</h1>
      <PostForm action={createPostAction} submitLabel="Criar post" />
    </>
  );
}
