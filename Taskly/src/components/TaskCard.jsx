import { useDispatch, useSelector } from "react-redux";
import { pinTask, unpinTask } from "../store/pinsSlice";

const PRIORITIES = ["low", "medium", "high"];

const PRIORITY_STYLES = {
  low:    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
  medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  high:   "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
};

function TaskCard({ task }) {
  const dispatch = useDispatch();
  const entry = useSelector((state) => state.pins.items[task.id]);
  const isPinned = Boolean(entry);
  const currentPriority = entry?.priority || "low";

  return (
    <article className="card group flex flex-col">
      {/* Status + title */}
      <div className="mb-3 flex items-start gap-3">
        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors
          ${task.completed
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
            : "border border-slate-300 bg-white text-transparent dark:border-slate-600 dark:bg-slate-800"}`}>
          {task.completed ? "✓" : ""}
        </span>
        <h3 className={`flex-1 text-sm font-medium leading-snug transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400
          ${task.completed ? "text-slate-400 line-through dark:text-slate-500" : "text-ink dark:text-white"}`}>
          {task.todo}
        </h3>
      </div>

      {/* Footer row */}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
        <span className="text-[11px] text-muted dark:text-slate-500">
          User #{task.userId}
        </span>

        <div className="flex items-center gap-1.5">
          {isPinned && (
            <select
              value={currentPriority}
              onChange={(e) => dispatch(pinTask({ task, priority: e.target.value }))}
              className={`cursor-pointer rounded-lg border px-2 py-0.5 text-xs font-semibold ${PRIORITY_STYLES[currentPriority]}`}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p} className="text-ink dark:text-white">
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </select>
          )}

          <button
            type="button"
            onClick={() =>
              isPinned
                ? dispatch(unpinTask(task.id))
                : dispatch(pinTask({ task, priority: "low" }))
            }
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-150 active:scale-95
              ${isPinned
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                : "bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-900/30 dark:text-brand-300 dark:hover:bg-brand-900/50"}`}
          >
            <svg className="h-3 w-3" fill={isPinned ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-7-3.5L5 21V5z" />
            </svg>
            {isPinned ? "Unpin" : "Pin"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
