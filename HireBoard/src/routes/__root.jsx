import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "../components/Navbar";
import { store } from "../store";
import { getCookie } from "../utils/cookies";

export const Route = createRootRoute({
  component: RootLayout,
  // Catches any unmatched path (including empty hash on GitHub Pages)
  // and redirects to the right page
  notFoundComponent: NotFoundRedirect,
});

function NotFoundRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = store.getState().auth.token || getCookie("hireboard-token");
    navigate({ to: token ? "/jobs" : "/login", replace: true });
  }, [navigate]);
  return null;
}

function RootLayout() {
  const theme = useSelector((state) => state.ui.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen bg-surface font-sans text-ink antialiased dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <Outlet />
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
