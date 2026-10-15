"use client";

import { useTransition } from "react";
import { deletePostAction } from "@/app/admin/actions";

export default function DeletePostButton({ id, title }: { id: string; title: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(`Excluir "${title}"? Essa ação não pode ser desfeita.`)) {
          startTransition(() => deletePostAction(id));
        }
      }}
      className="text-red-600 hover:underline disabled:opacity-50"
    >
      {pending ? "Excluindo..." : "Excluir"}
    </button>
  );
}
