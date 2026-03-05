import { useEffect, useState } from "react";

type DailyMetric = {
  date: string;
  subscribers: number;
  views: number;
  engagement_rate: number;
};

type Props = {
  apiBaseUrl: string;
  channelId: number;
};

export default function MiniAppRoot({ apiBaseUrl, channelId }: Props) {
  const [data, setData] = useState<DailyMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const response = await fetch(`${apiBaseUrl}/analytics/dashboard/${channelId}`);
      if (response.ok) {
        const json = await response.json();
        setData(json.days);
      }
      setLoading(false);
    }
    load();
  }, [apiBaseUrl, channelId]);

  if (loading) {
    return <div>Загружаем метрики...</div>;
  }

  if (data.length === 0) {
    return <div>Недостаточно данных по каналу</div>;
  }

  const last = data[data.length - 1];

  return (
    <div style={{ padding: 12, fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>GrowthKit Mini</div>
      <div style={{ fontSize: 13, marginBottom: 12 }}>Быстрый обзор канала за вчера</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
        <div>Подписчики: {last.subscribers}</div>
        <div>Просмотры: {last.views}</div>
        <div>ER: {(last.engagement_rate * 100).toFixed(2)}%</div>
      </div>
    </div>
  );
}
