import { useSelector } from "react-redux";
import { selectStatusCounts } from "../store/applicationsSlice";

const STATUS_CONFIG = {
  saved:        { label: "Saved",        color: "text-brand-600 dark:text-brand-400",    bg: "bg-brand-50 dark:bg-brand-900/20",   bar: "bg-brand-500" },
  applied:      { label: "Applied",      color: "text-sky-600 dark:text-sky-400",        bg: "bg-sky-50 dark:bg-sky-900/20",       bar: "bg-sky-500" },
  interviewing: { label: "Interviewing", color: "text-amber-600 dark:text-amber-400",    bg: "bg-amber-50 dark:bg-amber-900/20",   bar: "bg-amber-500" },
  offer:        { label: "Offer",        color: "text-emerald-600 dark:text-emerald-400",bg: "bg-emerald-50 dark:bg-emerald-900/20",bar: "bg-emerald-500" },
  rejected:     { label: "Rejected",     color: "text-red-600 dark:text-red-400",        bg: "bg-red-50 dark:bg-red-900/20",       bar: "bg-red-400" },
};

function StatsBar() {
  const counts = useSelector(selectStatusCounts);
  const total = Object.values(counts).reduce((s, n) => s + n, 0);

  return (
    <div className="mb-8 space-y-3">
      {/* Progress overview */}
      {total > 0 && (
        <div className="mb-4 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800" style={{ height: 6 }}>
          <div className="flex h-full w-full overflow-hidden rounded-full">
            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
              const pct = total > 0 ? (counts[key] / total) * 100 : 0;
              return pct > 0 ? (
                <div
                  key={key}
                  className={`${cfg.bar} transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                  title={`${cfg.label}: ${counts[key]}`}
                />
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
          <div
            key={key}
            className={`rounded-2xl border border-slate-200/70 ${cfg.bg} px-3 py-3.5 text-center transition-transform duration-200 hover:-translate-y-0.5 dark:border-slate-700/50`}
          >
            <p className={`text-3xl font-bold tabular-nums ${cfg.color}`}>{counts[key]}</p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted dark:text-slate-500">
              {cfg.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsBar;
