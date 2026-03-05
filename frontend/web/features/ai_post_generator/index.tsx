import { FormEvent, useState } from "react";

type GeneratedPost = {
  id: number;
  channel_id: number;
  content: string;
};

type Props = {
  apiBaseUrl: string;
};

export default function AiPostGeneratorFeature({ apiBaseUrl }: Props) {
  const [userId, setUserId] = useState("");
  const [channelId, setChannelId] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("");
  const [length, setLength] = useState("");
  const [result, setResult] = useState<GeneratedPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    const payload = {
      user_id: Number(userId),
      channel_id: Number(channelId),
      topic,
      tone: tone || null,
      length: length || null
    };
    const response = await fetch(`${apiBaseUrl}/ai-content/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      const json = (await response.json()) as GeneratedPost;
      setResult(json);
    } else if (response.status === 429) {
      setError("Достигнут лимит генераций на неделю");
    } else {
      setError("Ошибка генерации поста");
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-sm">
            <span>User ID</span>
            <input
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Channel ID</span>
            <input
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              required
            />
          </label>
        </div>
        <label className="flex flex-col gap-1 text-sm">
          <span>Тема поста</span>
          <input
            className="bg-slate-900 border border-slate-700 rounded px-2 py-1"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-sm">
            <span>Тон</span>
            <input
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              placeholder="дружелюбный, экспертный"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Длина</span>
            <input
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="короткий, средний, длинный"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-sm font-medium disabled:opacity-60"
        >
          {loading ? "Генерируем..." : "Сгенерировать пост"}
        </button>
      </form>
      {error && <div className="text-sm text-red-400">{error}</div>}
      {result && (
        <div className="space-y-2">
          <div className="text-sm text-slate-400">Сгенерированный пост</div>
          <div className="border border-slate-800 rounded-lg p-3 text-sm whitespace-pre-wrap">
            {result.content}
          </div>
        </div>
      )}
    </div>
  );
}
