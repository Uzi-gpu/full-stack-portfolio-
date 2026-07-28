import { useEffect } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { store } from "../store";
import { getCookie } from "../utils/cookies";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const token = store.getState().auth.token || getCookie("hireboard-token");
    throw redirect({ to: token ? "/jobs" : "/login" });
  },
  // Component fallback in case beforeLoad doesn't fire (e.g. hash history on GitHub Pages)
  component: IndexRedirect,
});

function IndexRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = store.getState().auth.token || getCookie("hireboard-token");
    navigate({ to: token ? "/jobs" : "/login", replace: true });
  }, [navigate]);
  return null;
}
