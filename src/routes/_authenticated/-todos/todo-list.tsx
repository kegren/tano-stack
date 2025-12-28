import { useLiveQuery } from "@tanstack/react-db";
import { Check } from "lucide-react";
import type { createTodosCollection } from "@/features/todos/collection";
import TodoItem from "./todo-item";

export default function TodoList({
  todosCollection,
  filter = "all",
}: {
  todosCollection: ReturnType<typeof createTodosCollection>;
  filter?: "all" | "active" | "completed";
}) {
  const { data: todos, isLoading } = useLiveQuery((q) =>
    q.from({ todo: todosCollection })
      .select(({ todo }) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        userId: todo.userId,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      }))
  );

  if (isLoading) {
    return (
      <div className="text-center text-muted-foreground">Loading...</div>
    );
  }

  const filteredTodos = todos?.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    }
    if (filter === "completed") {
      return todo.completed;
    }
    return true;
  });

  if (!filteredTodos || filteredTodos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 rounded-full bg-muted p-4">
          <Check className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">No todos yet</h3>
        <p className="text-muted-foreground">
          {filter === "active"
            ? "No active todos"
            : filter === "completed"
              ? "No completed todos"
              : "Get started by adding your first todo"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todosCollection={todosCollection}
          todo={todo}
        />
      ))}
    </div>
  );
}
