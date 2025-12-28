import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { Todo } from "@/db/schema/todos";
import type { createTodosCollection } from "@/features/todos/collection";

export default function TodoItem({
  todosCollection,
  todo,
}: {
  todosCollection: ReturnType<typeof createTodosCollection>;
  todo: Todo;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleToggle = () => {
    todosCollection.update(todo.id, (draft) => {
      draft.completed = !draft.completed;
    });
    toast.success(
      todo.completed ? "Todo marked as incomplete" : "Todo marked as complete"
    );
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
  };

  const handleSave = () => {
    if (!editTitle.trim()) {
      toast.error("Todo title cannot be empty");
      return;
    }

    todosCollection.update(todo.id, (draft) => {
      draft.title = editTitle.trim();
    });

    setIsEditing(false);
    toast.success("Todo updated");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
  };

  const handleDelete = () => {
    todosCollection.delete(todo.id);
    setDeleteDialogOpen(false);
    toast.success("Todo deleted");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div
      className={`
        flex items-center gap-3 rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:bg-accent
        ${todo.completed ? "opacity-50" : ""}
      `}
    >
      <Checkbox
        checked={todo.completed}
        onCheckedChange={handleToggle}
        disabled={false}
        aria-label={`Mark "${todo.title}" as ${
          todo.completed ? "incomplete" : "complete"
        }`}
      />

      <div className="flex-1">
        {isEditing ? (
          <Input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="h-8"
            autoFocus
            disabled={false}
          />
        ) : (
          <p
            onDoubleClick={handleEdit}
            className={`
              cursor-pointer text-sm transition-colors
              ${todo.completed ? "line-through text-muted-foreground" : ""
            }`}
            title="Double-click to edit"
          >
            {todo.title}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancelEdit}
              disabled={false}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={false}
            >
              Save
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            disabled={false}
          >
            Edit
          </Button>
        )}
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setDeleteDialogOpen(true)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete todo?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the todo
              "{todo.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
