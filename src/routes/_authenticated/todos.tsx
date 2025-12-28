import { useLiveSuspenseQuery } from "@tanstack/react-db";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { createTodosCollection } from "@/features/todos/collection";
import { getTodos } from "@/features/todos/server";
import Filters from "./-todos/filters";
import Stats from "./-todos/stats";
import TodoForm from "./-todos/todo-form";

export const Route = createFileRoute("/_authenticated/todos")({
  component: TodosPage,
  loader: async ({ context }) => {
    // Prefetch todos data - populates TanStack Query cache during SSR
    // This eliminates the "Missing getServerSnapshot" warning
    await context.queryClient.ensureQueryData({
      queryKey: ["todos"],
      queryFn: () => getTodos(),
    });
  },
});

function TodosPage() {
  const queryClient = useQueryClient();
  const todosCollection = createTodosCollection(queryClient);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Suspense fallback={<TodosSkeleton />}>
        <TodosContent todosCollection={todosCollection} />
      </Suspense>
    </div>
  );
}

function TodosContent({
  todosCollection,
}: {
  todosCollection: ReturnType<typeof createTodosCollection>;
}) {
  const { data: todos } = useLiveSuspenseQuery((q) =>
    q.from({ todo: todosCollection }).select(({ todo }) => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      userId: todo.userId,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    }))
  );

  // Data is guaranteed defined with useLiveSuspenseQuery - no optional chaining needed
  const sortedTodos = todos
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const totalCount = sortedTodos.length;
  const completedCount = sortedTodos.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;

  return (
    <div className="space-y-8">
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
          <Filters todosCollection={todosCollection} />
        </div>
        <Tips />
      </div>
    </div>
  );
}

function Tips() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <h2 className="mb-4 font-semibold text-xl">Tips</h2>
        <ul className="space-y-2 text-muted-foreground text-sm">
          <li>• Double-click on a todo to edit it</li>
          <li>• Press Enter to save your changes</li>
          <li>• Click checkbox to mark as complete</li>
          <li>• Filter your todos by status</li>
        </ul>
      </div>
    </div>
  );
}

function TodosSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-16 w-20" />
          <Skeleton className="h-16 w-20" />
          <Skeleton className="h-16 w-20" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="grid gap-8 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {/* Form skeleton */}
          <Skeleton className="h-10 w-full" />
          {/* Filters skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
        {/* Tips skeleton */}
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  );
}
