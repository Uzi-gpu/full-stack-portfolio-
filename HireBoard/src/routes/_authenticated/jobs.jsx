import { createFileRoute } from "@tanstack/react-router";
import JobsList from "../../components/JobsList";

export const Route = createFileRoute("/_authenticated/jobs")({
  component: JobsPage,
});

function JobsPage() {
  return <JobsList />;
}
