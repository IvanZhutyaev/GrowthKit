import { FormEvent, useState } from "react";

type ChannelSearchResult = {
  id: number;
  telegram_id: number;
  title: string;
  username: string | null;
  subscribers: number;
  engagement_rate: number;
};

type Props = {
  apiBaseUrl: string;
};

export default function ChannelSearchFeature({ apiBaseUrl }: Props) {
  const [query, setQuery] = useState("");
  const [minSubscribers, setMinSubscribers] = useState("");
  const [maxSubscribers, setMaxSubscribers] = useState("");
  const [results, setResults] = useState<ChannelSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    const payload = {
      query,
      min_subscribers: minSubscribers ? Number(minSubscribers) : null,
      max_subscribers: maxSubscribers ? Number(maxSubscribers) : null
    };
    const response = await fetch(`${apiBaseUrl}/channel-search/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      const json = (await response.json()) as ChannelSearchResult[];
      setResults(json);
    } else {
      setResults([]);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col gap-1 text-sm max-w-md">
          <span>Запрос</span>
          <input
            className="bg-slate-900 border border-slate-700 rounded px-2 py-1"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col gap-1 text-sm">
            <span>Мин. подписчиков</span>
            <input
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1 w-32"
              value={minSubscribers}
              onChange={(e) => setMinSubscribers(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <span>Макс. подписчиков</span>
            <input
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1 w-32"
              value={maxSubscribers}
              onChange={(e) => setMaxSubscribers(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-sm font-medium disabled:opacity-60"
        >
          {loading ? "Ищем..." : "Искать каналы"}
        </button>
      </form>
      {results.length > 0 && (
        <div className="space-y-2 text-sm">
          <div className="text-slate-400">Найденные каналы</div>
          <div className="border border-slate-800 rounded-lg divide-y divide-slate-800">
            {results.map((c) => (
              <div key={c.id} className="px-3 py-2 flex justify-between">
                <div className="flex flex-col">
                  <span>{c.title}</span>
                  <span className="text-slate-400 text-xs">
                    @{c.username || "no_username"} · {c.subscribers} подписчиков
                  </span>
                </div>
                <div className="text-xs text-emerald-400">
                  {(c.engagement_rate * 100).toFixed(1)} %
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
