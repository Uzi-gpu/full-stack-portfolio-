import { useDispatch, useSelector } from "react-redux";
import { saveJob, unsaveJob, setStatus } from "../store/applicationsSlice";

const STATUSES = ["saved", "applied", "interviewing", "offer", "rejected"];

const STATUS_STYLES = {
  saved:        "bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-900/30 dark:text-brand-300 dark:border-brand-800",
  applied:      "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800",
  interviewing: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  offer:        "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  rejected:     "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
};

const TYPE_DOT = {
  "Full-time": "bg-emerald-400",
  "Part-time": "bg-amber-400",
  "Contract":  "bg-violet-400",
  "Freelance": "bg-sky-400",
  "Internship":"bg-pink-400",
};

function JobCard({ job, showStatus = false }) {
  const dispatch = useDispatch();
  const entry = useSelector((state) => state.applications.items[job.id]);
  const isSaved = Boolean(entry);
  const dotColor = TYPE_DOT[job.type] || "bg-slate-400";

  return (
    <article className="card group flex flex-col">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-ink transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
            {job.title}
          </h3>
          <p className="mt-0.5 text-sm font-medium text-brand-600 dark:text-brand-400">{job.company}</p>
        </div>
        {/* Type badge */}
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300">
          <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
          {job.type}
        </span>
      </div>

      {/* Description */}
      <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted dark:text-slate-400">
        {job.description}
      </p>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {job.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {/* Location / Salary row */}
      <div className="mb-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm dark:border-slate-800">
        <span className="flex items-center gap-1 text-muted dark:text-slate-400">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          </svg>
          {job.location}
        </span>
        <span className="font-semibold text-ink dark:text-white">{job.salary}</span>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        {isSaved ? (
          <button
            type="button"
            onClick={() => dispatch(unsaveJob(job.id))}
            className="btn-ghost text-xs"
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 0 1 5.656 0L10 6.343l1.172-1.171a4 4 0 1 1 5.656 5.656L10 17.657l-6.828-6.829a4 4 0 0 1 0-5.656z" />
            </svg>
            Saved
          </button>
        ) : (
          <button
            type="button"
            onClick={() => dispatch(saveJob(job))}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-3 py-2 text-xs font-semibold text-white shadow-sm shadow-brand-500/20 transition-all hover:shadow-md hover:shadow-brand-500/30 active:scale-95"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z" />
            </svg>
            Save job
          </button>
        )}

        {showStatus && isSaved && (
          <select
            value={entry.status}
            onChange={(e) => dispatch(setStatus({ id: job.id, status: e.target.value }))}
            className={`rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-colors ${STATUS_STYLES[entry.status] || STATUS_STYLES.saved} cursor-pointer`}
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        )}
      </div>
    </article>
  );
}

export default JobCard;
