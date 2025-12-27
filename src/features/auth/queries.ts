import { queryOptions } from "@tanstack/react-query";
import { getSession } from "./functions"; // server function that returns session

export const authSessionQueryOptions = () =>
  queryOptions({
    queryKey: ["auth", "session"],
    queryFn: () => getSession(),
    staleTime: 60 * 1000, // 60 seconds - client won't refetch if data is fresher
    gcTime: 5 * 60 * 1000, // 5 minutes - keep in cache for background refetches
  });