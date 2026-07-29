import { createFileRoute } from "@tanstack/react-router";
import PinnedTasks from "../../components/PinnedTasks";

export const Route = createFileRoute("/_authenticated/pinned")({
  component: () => <PinnedTasks />,
});
