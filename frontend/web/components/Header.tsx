import Link from "next/link";

export default function Header() {
  return (
    <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8">
      <div className="font-semibold text-lg">GrowthKit</div>
      <nav className="flex gap-4 text-sm">
        <Link href="/dashboard">Дашборд</Link>
        <Link href="/channels/search">Поиск каналов</Link>
        <Link href="/ai/post-generator">AI генератор</Link>
      </nav>
    </header>
  );
}
