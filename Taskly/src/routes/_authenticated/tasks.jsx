import { createFileRoute } from "@tanstack/react-router";
import TasksList from "../../components/TasksList";

export const Route = createFileRoute("/_authenticated/tasks")({
  component: () => <TasksList />,
});
