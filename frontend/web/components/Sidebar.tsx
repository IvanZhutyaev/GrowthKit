import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-56 border-r border-slate-800 p-4 text-sm space-y-2">
      <div className="font-medium mb-2">Навигация</div>
      <div className="flex flex-col gap-1">
        <Link href="/dashboard">Обзор канала</Link>
        <Link href="/channels/search">Поиск каналов</Link>
        <Link href="/ai/post-generator">AI генератор постов</Link>
      </div>
    </aside>
  );
}
