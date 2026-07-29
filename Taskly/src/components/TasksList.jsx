import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetTodosQuery, useAddTodoMutation } from "../apis/todosApi";
import TaskCard from "./TaskCard";

function TasksList() {
  const { data: todos, isLoading, isError, refetch } = useGetTodosQuery();
  const [addTodo, { isLoading: isAdding }] = useAddTodoMutation();
  const [newTaskText, setNewTaskText] = useState("");
  const user = useSelector((state) => state.auth.user);

  if (isLoading) return <p className="text-muted dark:text-slate-400">Loading tasks from DummyJSON...</p>;

  if (isError) return (
    <div className="rounded border border-red-200 p-4 text-red-600 dark:border-red-900/50 dark:text-red-400">
      Failed to load tasks. <button onClick={refetch} className="underline">Try again</button>
    </div>
  );

  const safeTodos = todos || [];

  async function handleAdd(e) {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    try {
      await addTodo({
        todo: newTaskText,
        completed: false,
        userId: user?.id || 1,
      }).unwrap();
      setNewTaskText(""); // Clear the input after success
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  }

  return (
    <section>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Your Feed</h2>
          <p className="text-sm text-muted dark:text-slate-400">{safeTodos.length} items loaded via RTK Query</p>
        </div>
        <button
          onClick={refetch}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
        >
          Refresh
        </button>
      </div>

      {/* NEW: Add Task Form */}
      <form onSubmit={handleAdd} className="mb-8 flex gap-3">
        <input
          type="text"
          placeholder="What do you need to do?"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-slate-600 dark:bg-slate-950"
        />
        <button
          type="submit"
          disabled={isAdding || !newTaskText.trim()}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
        >
          {isAdding ? "Adding..." : "Add Task"}
        </button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {safeTodos.map(task => <TaskCard key={task.id} task={task} />)}
      </div>
    </section>
  );
}

export default TasksList;