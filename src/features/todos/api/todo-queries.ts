import { type QueryClient, queryOptions } from "@tanstack/react-query";
import { getTodos } from "./todo-actions";

export const todosKeys = {
  all: ["todos"] as const,
  list: (userId: string) => [...todosKeys.all, "list", userId] as const,
};

export const todosListQueryOptions = (userId: string) => {
  return queryOptions({
    queryKey: todosKeys.list(userId),
    queryFn: () => getTodos(),
  });
};

export async function prefetchTodos(queryClient: QueryClient, userId: string) {
  await queryClient.ensureQueryData(todosListQueryOptions(userId));
}
