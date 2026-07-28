import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { useLoginMutation } from "../apis/loginApi";
import { useNavigate } from "@tanstack/react-router";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, error, reset }] = useLoginMutation();
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  async function handleSubmit(event) {
    event.preventDefault();
    reset();
    try {
      const data = await login({ username, password }).unwrap();
      dispatch(setCredentials(data));
      navigate({ to: "/jobs" });
    } catch {
      // error updates automatically via RTK Query
    }
  }

  const errorMessage =
    typeof error?.data === "string"
      ? error.data
      : error?.data?.message || (error ? "Login failed. Check your credentials." : null);

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 animate-fade-up">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 shadow-lg shadow-brand-500/30">
            <svg viewBox="0 0 16 16" className="h-7 w-7 fill-white" aria-hidden="true">
              <path d="M8 1a2 2 0 0 1 2 2v1h1.5A1.5 1.5 0 0 1 13 5.5v7A1.5 1.5 0 0 1 11.5 14h-7A1.5 1.5 0 0 1 3 12.5v-7A1.5 1.5 0 0 1 4.5 4H6V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v1h2V3a1 1 0 0 0-1-1zM5 8a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H5zm0 3a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2H5z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold gradient-text">HireBoard</h1>
          <p className="mt-1 text-sm text-muted dark:text-slate-400">Your job search, beautifully organised</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-card p-8 shadow-xl shadow-slate-200/60 dark:border-slate-700/60 dark:bg-slate-900 dark:shadow-none">
          <h2 className="mb-1 text-xl font-semibold text-ink dark:text-white">Welcome back</h2>
          <p className="mb-6 text-sm text-muted dark:text-slate-400">
            Sign in to continue tracking your applications
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="username" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Username
              </label>
              <input
                id="username"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter your password"
              />
            </div>

            {errorMessage && (
              <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-950/50 dark:text-red-400">
                <svg className="mt-0.5 h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <button type="submit" disabled={isLoading} className="btn-primary mt-2">
              {isLoading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                "Sign in →"
              )}
            </button>
          </form>

          {/* Demo hint */}
          <p className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-2.5 text-center text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
            Demo credentials pre-filled · powered by{" "}
            <a href="https://dummyjson.com" target="_blank" rel="noreferrer" className="font-medium text-brand-600 hover:underline dark:text-brand-400">
              dummyjson.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
