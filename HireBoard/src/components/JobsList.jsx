import { useGetJobsQuery } from "../apis/jobsApi";
import JobCard from "./JobCard";

function SkeletonCard() {
  return (
    <div className="card animate-pulse space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="h-3 w-1/2 rounded-lg bg-slate-100 dark:bg-slate-800" />
        </div>
        <div className="h-6 w-20 rounded-full bg-slate-100 dark:bg-slate-800" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
        <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
        <div className="h-3 w-4/5 rounded bg-slate-100 dark:bg-slate-800" />
      </div>
      <div className="flex gap-2">
        <div className="h-5 w-16 rounded-lg bg-slate-100 dark:bg-slate-800" />
        <div className="h-5 w-12 rounded-lg bg-slate-100 dark:bg-slate-800" />
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
        <div className="h-3 w-24 rounded bg-slate-100 dark:bg-slate-800" />
        <div className="h-3 w-20 rounded bg-slate-100 dark:bg-slate-800" />
      </div>
    </div>
  );
}

function JobsList() {
  const { data: jobs, isLoading, isError, error, refetch, isFetching } = useGetJobsQuery();

  if (isLoading) {
    return (
      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="h-7 w-32 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="mt-2 h-3 w-48 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </section>
    );
  }

  if (isError) {
    const errorMsg =
      typeof error?.data === "string"
        ? error.data
        : error?.data?.message || error?.error || "Unknown API error";

    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-10 text-center dark:border-red-900/50 dark:bg-red-950/30">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
          <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-red-700 dark:text-red-400">Could not load jobs</p>
          <p className="mt-1 text-sm text-red-600/80 dark:text-red-500">{errorMsg}</p>
        </div>
        <button type="button" onClick={refetch} className="btn-ghost text-sm text-red-700 dark:text-red-400">
          Try again
        </button>
      </div>
    );
  }

  const safeJobs = jobs || [];
  const isMockData = safeJobs.length > 0 && safeJobs.length <= 8 && safeJobs[0]?.id === 1;

  return (
    <section>
      {/* Mock data banner */}
      {isMockData && (
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm dark:border-amber-700/50 dark:bg-amber-950/30">
          <svg className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clipRule="evenodd" />
          </svg>
          <span className="text-amber-800 dark:text-amber-300">
            <strong>jsonfakery.com is unreachable</strong> — showing demo data. Real jobs load automatically when back online.
          </span>
        </div>
      )}

      {/* Section header */}
      <div className="mb-6 flex items-end justify-between gap-4 animate-fade-up">
        <div>
          <h2 className="text-2xl font-bold text-ink dark:text-white">
            Open roles
            <span className="ml-2 inline-flex h-6 items-center rounded-full bg-brand-50 px-2.5 text-sm font-semibold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
              {safeJobs.length}
            </span>
          </h2>
          <p className="mt-1 text-sm text-muted dark:text-slate-400">
            {isMockData ? "Demo listings" : "Live from GET /jobs"} · click Save to track
          </p>
        </div>
        <button
          type="button"
          onClick={refetch}
          disabled={isFetching}
          className="btn-ghost gap-1.5"
        >
          <svg className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15" />
          </svg>
          {isFetching ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {safeJobs.map((job, i) => (
          <div
            key={job.id}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default JobsList;