import { useEffect } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { store } from "../store";
import { getCookie } from "../utils/cookies";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const token = store.getState().auth.token || getCookie("taskly-token");
    throw redirect({ to: token ? "/tasks" : "/login" });
  },
  component: IndexRedirect,
});

function IndexRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = store.getState().auth.token || getCookie("taskly-token");
    navigate({ to: token ? "/tasks" : "/login", replace: true });
  }, [navigate]);
  return null;
}
