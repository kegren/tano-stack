import { createCollection } from "@tanstack/db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { type QueryClient, queryOptions } from "@tanstack/react-query";
import type { Todo } from "@/db/schema/todos";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./server";

export const todosKeys = {
  all: ["todos"] as const,
  list: (userId: string) => [...todosKeys.all, "list", userId] as const,
};

export const todosListQueryOptions = (userId: string) => {
  return queryOptions({
    queryKey: todosKeys.list(userId),
    queryFn: () => getTodos(),
  });
}

export async function prefetchTodos(queryClient: QueryClient, userId: string) {
  await queryClient.ensureQueryData(todosListQueryOptions(userId));
}

export function createTodosCollection(
  queryClient: QueryClient,
  userId: string
) {
  return createCollection(
    queryCollectionOptions({
      id: `todos:${userId}`,
      queryKey: todosKeys.list(userId),
      queryFn: getTodos,
      queryClient,
      getKey: (item: Todo) => item.id,

      onInsert: async ({ transaction }) => {
        const { modified } = transaction.mutations[0];
        await createTodo({ data: { id: modified.id, title: modified.title } });
      },

      onUpdate: async ({ transaction }) => {
        const { original, modified } = transaction.mutations[0];
        await updateTodo({ data: { id: original.id, updates: modified } });
      },

      onDelete: async ({ transaction }) => {
        const { original } = transaction.mutations[0];
        await deleteTodo({ data: { id: original.id } });
      },
    })
  );
}
