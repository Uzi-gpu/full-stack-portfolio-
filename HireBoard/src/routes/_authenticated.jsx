import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { store } from "../store";
import { getCookie } from "../utils/cookies";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ location }) => {
    const token = store.getState().auth.token || getCookie("hireboard-token");
    if (!token) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}
