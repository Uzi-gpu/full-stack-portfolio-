import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const savedCount = useSelector((state) => Object.keys(state.applications.items).length);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  function handleLogout() {
    dispatch(logout());
    navigate({ to: "/login" });
  }

  const navLink = (to, label) => {
    const isActive = pathname === to;
    return (
      <Link
        to={to}
        className={`relative rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
          isActive
            ? "text-brand-600 dark:text-brand-400"
            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        {isActive && (
          <span className="absolute inset-0 rounded-lg bg-brand-50 dark:bg-brand-900/30" />
        )}
        <span className="relative">{label}</span>
        {to === "/saved" && savedCount > 0 && (
          <span className="relative ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white dark:bg-brand-500">
            {savedCount}
          </span>
        )}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 glass shadow-sm dark:border-slate-800/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-5">
          <Link
            to={user ? "/jobs" : "/login"}
            className="flex items-center gap-2 group"
          >
            {/* Logo mark */}
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-500 shadow-sm shadow-brand-500/30 transition-transform duration-200 group-hover:scale-105">
              <svg viewBox="0 0 16 16" className="h-4 w-4 fill-white" aria-hidden="true">
                <path d="M8 1a2 2 0 0 1 2 2v1h1.5A1.5 1.5 0 0 1 13 5.5v7A1.5 1.5 0 0 1 11.5 14h-7A1.5 1.5 0 0 1 3 12.5v-7A1.5 1.5 0 0 1 4.5 4H6V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v1h2V3a1 1 0 0 0-1-1zM5 8a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H5zm0 3a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2H5z"/>
              </svg>
            </span>
            <span className="text-base font-bold tracking-tight gradient-text">HireBoard</span>
          </Link>

          {user && (
            <nav className="flex items-center gap-1">
              {navLink("/jobs", "Jobs")}
              {navLink("/saved", "Saved")}
            </nav>
          )}
        </div>

        {/* Right: User + actions */}
        <div className="flex items-center gap-2">
          {user && (
            <>
              <div className="hidden sm:flex items-center gap-2 mr-1">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-xs font-bold text-white shadow-sm">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="btn-ghost text-xs"
              >
                Log out
              </button>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
