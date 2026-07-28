import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "../components/Navbar";

export const Route = createRootRoute({
  component: RootLayout,
});

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
