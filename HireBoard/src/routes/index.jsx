import { createFileRoute, redirect } from "@tanstack/react-router";
import { store } from "../store";
import { getCookie } from "../utils/cookies";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const token = store.getState().auth.token || getCookie("hireboard-token");
    throw redirect({ to: token ? "/jobs" : "/login" });
  },
});
