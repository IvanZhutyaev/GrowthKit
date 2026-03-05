type Props = {
  label: string;
  value: string;
  accent?: boolean;
};

export default function MetricCard({ label, value, accent }: Props) {
  return (
    <div
      className={
        "rounded-xl border px-4 py-3 text-sm " +
        (accent ? "border-emerald-500 bg-emerald-500/10" : "border-slate-800 bg-slate-900")
      }
    >
      <div className="text-slate-400">{label}</div>
      <div className="text-lg font-semibold mt-1">{value}</div>
    </div>
  );
}
