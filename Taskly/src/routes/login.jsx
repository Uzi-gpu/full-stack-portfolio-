import { createFileRoute, redirect } from "@tanstack/react-router";
import { store } from "../store";
import { getCookie } from "../utils/cookies";
import LoginForm from "../components/LoginForm";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    const token = store.getState().auth.token || getCookie("taskly-token");
    if (token) throw redirect({ to: "/tasks" });
  },
  component: () => <LoginForm />,
});
