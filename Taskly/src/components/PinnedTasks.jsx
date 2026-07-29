import { useSelector } from "react-redux";
import { Link } from "@tanstack/react-router";
import { selectPinnedEntries } from "../store/pinsSlice";
import TaskCard from "./TaskCard";
import StatsBar from "./StatsBar";

function PinnedTasks() {
  const entries = useSelector(selectPinnedEntries);

  if (entries.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center gap-5 py-20 text-center animate-fade-up">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl"
          style={{ background: "linear-gradient(135deg, #f0fdfa, #ccfbf1)" }}>
          <svg className="h-10 w-10 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-7-3.5L5 21V5z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-ink dark:text-white">No pinned tasks yet</h2>
          <p className="mt-1.5 max-w-sm text-sm text-muted dark:text-slate-400">
            Head to your feed and click{" "}
            <strong className="text-brand-600 dark:text-brand-400">Pin</strong>{" "}
            on any task to track it here with a custom priority.
          </p>
        </div>
        <Link
          to="/tasks"
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)", boxShadow: "0 4px 14px rgba(13,148,136,0.3)" }}
        >
          Browse tasks →
        </Link>
      </section>
    );
  }

  return (
    <section className="animate-fade-up">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink dark:text-white">
            Pinned Tasks
            <span className="ml-2 inline-flex h-6 items-center rounded-full bg-brand-50 px-2.5 text-sm font-semibold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
              {entries.length}
            </span>
          </h2>
          <p className="mt-1 text-sm text-muted dark:text-slate-400">
            Organised by your custom priority · most recently pinned first
          </p>
        </div>
      </div>

      <StatsBar />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map(({ task }, i) => (
          <div key={task.id} className="animate-fade-up" style={{ animationDelay: `${i * 30}ms` }}>
            <TaskCard task={task} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PinnedTasks;
