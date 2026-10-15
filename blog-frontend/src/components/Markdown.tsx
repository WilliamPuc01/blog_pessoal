import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Renderiza o content (Markdown) dos posts. Funciona em Server e Client Components. */
export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-stone max-w-none dark:prose-invert prose-a:text-accent prose-pre:bg-stone-900">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
