import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PostForm from "@/components/PostForm";
import ApiErrorMessage from "@/components/ApiErrorMessage";
import { TextSkeleton } from "@/components/Skeletons";
import { adminGetPost } from "@/lib/api";
import { updatePostAction } from "../../../actions";

export const metadata: Metadata = { title: "Editar post", robots: { index: false } };

type Params = Promise<{ id: string }>;

async function EditForm({ params }: { params: Params }) {
  const { id } = await params;
  let post;
  try {
    post = await adminGetPost(id);
  } catch (e) {
    return <ApiErrorMessage error={e} />;
  }
  if (!post) notFound();

  return <PostForm action={updatePostAction.bind(null, id)} post={post} submitLabel="Salvar alterações" />;
}

export default function EditPostPage({ params }: { params: Params }) {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Editar post</h1>
      <Suspense fallback={<TextSkeleton />}>
        <EditForm params={params} />
      </Suspense>
    </>
  );
}
