import { createFileRoute } from "@tanstack/react-router";
import SavedJobs from "../../components/SavedJobs";

export const Route = createFileRoute("/_authenticated/saved")({
  component: SavedPage,
});

function SavedPage() {
  return <SavedJobs />;
}
