import Link from "next/link";

const links = [
  { href: "/", label: "Início" },
  { href: "/posts", label: "Posts" },
  { href: "/admin", label: "Admin" },
];

export default function Header() {
  return (
    <header className="border-b border-border">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          William<span className="text-accent">.dev</span>
        </Link>
        <ul className="flex gap-5 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-muted transition-colors hover:text-foreground">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
