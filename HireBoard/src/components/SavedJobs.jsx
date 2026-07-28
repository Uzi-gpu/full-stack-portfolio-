import { useSelector } from "react-redux";
import { Link } from "@tanstack/react-router";
import { selectSavedEntries } from "../store/applicationsSlice";
import JobCard from "./JobCard";
import StatsBar from "./StatsBar";

function SavedJobs() {
  const entries = useSelector(selectSavedEntries);

  if (entries.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center gap-5 py-20 text-center animate-fade-up">
        {/* Illustration */}
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-50 to-accent-500/10 dark:from-brand-900/30 dark:to-accent-900/10">
          <svg className="h-10 w-10 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-ink dark:text-white">No saved jobs yet</h2>
          <p className="mt-1.5 max-w-sm text-sm text-muted dark:text-slate-400">
            Browse open roles and click <strong className="text-brand-600 dark:text-brand-400">Save job</strong> to start tracking your applications here.
          </p>
        </div>
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-500/25 transition-all hover:shadow-lg hover:shadow-brand-500/30 active:scale-[0.98]"
        >
          Browse open roles →
        </Link>
      </section>
    );
  }

  return (
    <section className="animate-fade-up">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink dark:text-white">
            My Applications
            <span className="ml-2 inline-flex h-6 items-center rounded-full bg-brand-50 px-2.5 text-sm font-semibold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
              {entries.length}
            </span>
          </h2>
          <p className="mt-1 text-sm text-muted dark:text-slate-400">
            Update your status as you progress through the hiring process
          </p>
        </div>
      </div>

      <StatsBar />

      <div className="grid gap-4 sm:grid-cols-2">
        {entries.map(({ job }, i) => (
          <div
            key={job.id}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <JobCard job={job} showStatus />
          </div>
        ))}
      </div>
    </section>
  );
}

export default SavedJobs;
