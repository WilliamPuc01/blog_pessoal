import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-2xl font-bold">Página não encontrada</h1>
      <p className="mt-2 text-muted">O conteúdo que você procura não existe ou não foi publicado.</p>
      <Link href="/" className="mt-6 inline-block text-accent hover:underline">
        Voltar ao início
      </Link>
    </div>
  );
}
