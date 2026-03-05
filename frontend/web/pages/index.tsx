import Link from "next/link";
import Layout from "../components/Layout";

export default function IndexPage() {
  return (
    <Layout>
      <div className="max-w-xl space-y-6">
        <h1 className="text-3xl font-semibold">GrowthKit</h1>
        <p className="text-slate-300">
          Командный центр для роста Telegram‑канала: аналитика, поиск каналов и AI‑генератор постов.
        </p>
        <div className="flex gap-3">
          <Link
            href="/auth"
            className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-medium text-sm"
          >
            Подключить канал
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg border border-slate-700 text-sm"
          >
            Перейти в дашборд
          </Link>
        </div>
      </div>
    </Layout>
  );
}
