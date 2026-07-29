import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const pinnedCount = useSelector((state) => Object.keys(state.pins.items).length);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const linkBase = "relative rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200";
  const active = "text-brand-600 dark:text-brand-400";
  const idle = "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white";

  const navLink = (to, label, badge) => {
    const isActive = pathname === to;
    return (
      <Link to={to} className={`${linkBase} ${isActive ? active : idle}`}>
        {isActive && (
          <span className="absolute inset-0 rounded-lg bg-brand-50 dark:bg-brand-900/30" />
        )}
        <span className="relative">
          {label}
          {badge > 0 && (
            <span className="relative ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white dark:bg-brand-500">
              {badge}
            </span>
          )}
        </span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 backdrop-blur-md shadow-sm dark:border-slate-800/80"
      style={{ background: "rgba(255,255,255,0.85)" }}
    >
      <div className="dark:bg-transparent" style={{}}>
        <style>{`.dark header { background: rgba(15,23,42,0.85) !important; }`}</style>
      </div>
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-3">
        {/* Left */}
        <div className="flex items-center gap-5">
          <Link to={user ? "/tasks" : "/login"} className="flex items-center gap-2 group">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg shadow-sm transition-transform duration-200 group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}>
              <svg viewBox="0 0 16 16" className="h-4 w-4 fill-white">
                <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1H2V3zm0 3h12v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6zm3 2a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H5z"/>
              </svg>
            </span>
            <span className="text-base font-bold tracking-tight gradient-text">Taskly</span>
          </Link>

          {user && (
            <nav className="flex items-center gap-1">
              {navLink("/tasks", "Tasks")}
              {navLink("/pinned", "Pinned", pinnedCount)}
            </nav>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {user && (
            <>
              <div className="hidden sm:flex items-center gap-2 mr-1">
                <span className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                  style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}>
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <button
                type="button"
                onClick={() => { dispatch(logout()); navigate({ to: "/login" }); }}
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
