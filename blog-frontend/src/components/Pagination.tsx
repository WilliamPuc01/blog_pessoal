import Link from "next/link";

interface Props {
  page: number; // começa em 0 (igual ao backend)
  totalPages: number;
  query: Record<string, string | undefined>;
}

export default function Pagination({ page, totalPages, query }: Props) {
  if (totalPages <= 1) return null;

  const href = (p: number) => {
    const qs = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => v && qs.set(k, v));
    if (p > 0) qs.set("page", String(p));
    const s = qs.toString();
    return `/posts${s ? `?${s}` : ""}`;
  };

  const btn = "rounded-lg border border-border px-3 py-1.5 text-sm";
  return (
    <nav className="mt-8 flex items-center justify-between">
      {page > 0 ? <Link href={href(page - 1)} className={btn}>← Anterior</Link> : <span />}
      <span className="text-sm text-muted">
        Página {page + 1} de {totalPages}
      </span>
      {page + 1 < totalPages ? <Link href={href(page + 1)} className={btn}>Próxima →</Link> : <span />}
    </nav>
  );
}
