import { FormEvent, useState } from "react";

type Props = {
  apiBaseUrl: string;
};

export default function AuthFeature({ apiBaseUrl }: Props) {
  const [telegramId, setTelegramId] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [channelId, setChannelId] = useState("");
  const [channelTitle, setChannelTitle] = useState("");
  const [channelUsername, setChannelUsername] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setResult(null);
    const payload = {
      telegram_id: Number(telegramId),
      username: username || null,
      first_name: firstName || null,
      last_name: lastName || null,
      channel: {
        telegram_id: Number(channelId),
        title: channelTitle,
        username: channelUsername || null
      }
    };
    const response = await fetch(`${apiBaseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      setResult("Ошибка подключения канала");
    } else {
      const data = await response.json();
      setResult(`Канал подключен, id пользователя: ${data.id}`);
    }
    setSubmitting(false);
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold">Подключение через Telegram</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-sm">
            <span>Telegram ID</span>
            <input
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1"
              value={telegramId}
              onChange={(e) => setTelegramId(e.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Username</span>
            <input
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-sm">
            <span>Имя</span>
            <input
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Фамилия</span>
            <input
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-sm">
            <span>Channel ID</span>
            <input
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Channel username</span>
            <input
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1"
              value={channelUsername}
              onChange={(e) => setChannelUsername(e.target.value)}
            />
          </label>
        </div>
        <label className="flex flex-col gap-1 text-sm">
          <span>Название канала</span>
          <input
            className="bg-slate-900 border border-slate-700 rounded px-2 py-1"
            value={channelTitle}
            onChange={(e) => setChannelTitle(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-sm font-medium disabled:opacity-60"
        >
          {submitting ? "Подключаем..." : "Подключить канал"}
        </button>
      </form>
      {result && <div className="text-sm text-slate-200">{result}</div>}
    </div>
  );
}
