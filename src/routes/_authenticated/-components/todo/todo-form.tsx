import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { createTodosCollection } from "@/features/todos/collection";
import { Route } from "@/routes/_authenticated/todos";

export default function TodoForm({
  todosCollection,
}: {
  todosCollection: ReturnType<typeof createTodosCollection>;
}) {
  const { user } = Route.useRouteContext();
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a todo title");
      return;
    }

    todosCollection.insert({
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    setTitle("");
    toast.success("Todo created");
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input
        autoFocus
        className="flex-1"
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
        placeholder="What needs to be done?"
        type="text"
        value={title}
      />
      <Button type="submit">Add</Button>
    </form>
  );
}
