import { eq, useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTodosCollection } from "@/features/todos/collection";
import { getTodos } from "@/features/todos/server";
import TodoForm from "./-components/todo/todo-form";
import TodoItem from "./-components/todo/todo-item";
import Stats from "./-components/todo/todo-stats";

export const Route = createFileRoute("/_authenticated/todos")({
  component: TodosPage,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["todos"],
      queryFn: () => getTodos(),
    });
  },
  ssr: false,
});

function TodosPage() {
  const { user } = Route.useRouteContext();
  const todosCollection = createTodosCollection(user.id);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const { data: todos } = useLiveQuery(
    (q) => {
      let query = q.from({ todo: todosCollection });

      if (filter === "active") {
        query = query.where(({ todo }) => eq(todo.completed, false));
      } else if (filter === "completed") {
        query = query.where(({ todo }) => eq(todo.completed, true));
      }

      return query
        .orderBy(({ todo }) => todo.completed)
        .orderBy(({ todo }) => todo.createdAt, "desc");
    },
    [filter]
  );

  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;

  return (
    <div className="space-y-8 pt-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Todos</h1>
          <p className="text-muted-foreground">Manage your tasks efficiently</p>
        </div>
        <Stats
          activeCount={activeCount}
          completedCount={completedCount}
          totalCount={totalCount}
        />
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <TodoForm todosCollection={todosCollection} />

          <div>
            <Select
              onValueChange={(value: "all" | "active" | "completed") =>
                setFilter(value)
              }
              value={filter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Todos</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                todosCollection={todosCollection}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h2 className="mb-4 font-semibold text-xl">Tips</h2>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• Press Enter to save your changes</li>
              <li>• Click checkbox to mark as complete</li>
              <li>• Filter your todos by status</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
