import { useSelector } from "react-redux";
import { selectPriorityCounts } from "../store/pinsSlice";

const STATS = [
  { key: "high",   label: "High",   color: "text-red-600 dark:text-red-400",     bg: "bg-red-50 dark:bg-red-900/20",     bar: "bg-red-500" },
  { key: "medium", label: "Medium", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20", bar: "bg-amber-500" },
  { key: "low",    label: "Low",    color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", bar: "bg-emerald-500" },
];

function StatsBar() {
  const counts = useSelector(selectPriorityCounts);
  const total = counts.high + counts.medium + counts.low;

  return (
    <div className="mb-8 space-y-3">
      {total > 0 && (
        <div className="overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800" style={{ height: 5 }}>
          <div className="flex h-full overflow-hidden rounded-full">
            {STATS.map(({ key, bar }) => {
              const pct = total > 0 ? (counts[key] / total) * 100 : 0;
              return pct > 0 ? (
                <div key={key} className={`${bar} transition-all duration-700`} style={{ width: `${pct}%` }} />
              ) : null;
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        {STATS.map(({ key, label, color, bg }) => (
          <div key={key}
            className={`rounded-2xl border border-slate-200/70 ${bg} px-3 py-3.5 text-center transition-transform duration-200 hover:-translate-y-0.5 dark:border-slate-700/50`}>
            <p className={`text-3xl font-bold tabular-nums ${color}`}>{counts[key]}</p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted dark:text-slate-500">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsBar;
