import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { createTodosCollection } from "@/features/todos/collection";
import TodoList from "./todo-list";

export default function Filters({
  todosCollection,
}: {
  todosCollection: ReturnType<typeof createTodosCollection>;
}) {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  return (
    <div className="space-y-4">
      <Select
        value={filter}
        onValueChange={(value: "all" | "active" | "completed") =>
          setFilter(value)
        }
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
      <TodoList todosCollection={todosCollection} filter={filter} />
    </div>
  );
}
