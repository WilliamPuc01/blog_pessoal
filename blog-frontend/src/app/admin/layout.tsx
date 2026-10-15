export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div>
      <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-xs text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
        Área admin ainda sem login. A autenticação JWT entra no próximo passo do backend.
      </div>
      {children}
    </div>
  );
}
