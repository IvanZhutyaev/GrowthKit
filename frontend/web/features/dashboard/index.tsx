import { useState } from "react";
import MetricCard from "../../components/MetricCard";

type DailyMetrics = {
  date: string;
  subscribers: number;
  views: number;
  posts: number;
  reactions: number;
  engagement_rate: number;
};

type DashboardData = {
  channel_id: number;
  days: DailyMetrics[];
  average_engagement_rate: number;
};

type Props = {
  apiBaseUrl: string;
};

export default function DashboardFeature({ apiBaseUrl }: Props) {
  const [channelId, setChannelId] = useState("");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    if (!channelId) {
      return;
    }
    setLoading(true);
    const response = await fetch(`${apiBaseUrl}/analytics/dashboard/${channelId}`);
    if (response.ok) {
      const json = (await response.json()) as DashboardData;
      setData(json);
    } else {
      setData(null);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end gap-3">
        <div className="flex flex-col gap-1 text-sm">
          <span>ID канала</span>
          <input
            className="bg-slate-900 border border-slate-700 rounded px-2 py-1 w-48"
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
          />
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-sm font-medium disabled:opacity-60"
        >
          {loading ? "Загружаем..." : "Загрузить данные"}
        </button>
      </div>
      {data && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 max-w-3xl">
            <MetricCard
              label="Средний ER"
              value={(data.average_engagement_rate * 100).toFixed(2) + " %"}
              accent
            />
            <MetricCard
              label="Подписчики (последний день)"
              value={String(data.days[data.days.length - 1]?.subscribers ?? 0)}
            />
            <MetricCard
              label="Просмотры (последний день)"
              value={String(data.days[data.days.length - 1]?.views ?? 0)}
            />
          </div>
          <div className="space-y-2 text-sm">
            <div className="text-slate-400">История за 7 дней</div>
            <div className="border border-slate-800 rounded-lg divide-y divide-slate-800">
              {data.days.map((d) => (
                <div key={d.date} className="flex justify-between px-3 py-2">
                  <span className="w-32">{d.date}</span>
                  <span className="w-24 text-right">{d.subscribers}</span>
                  <span className="w-24 text-right">{d.views}</span>
                  <span className="w-20 text-right">{d.posts}</span>
                  <span className="w-24 text-right">
                    {(d.engagement_rate * 100).toFixed(2)} %
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
