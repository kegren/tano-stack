import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { todo } from "@/db/schema/todos";
import {
  createTodoSchema,
  deleteTodoSchema,
  updateTodoSchema,
} from "@/features/todos/types/todo-types";
import { db } from "@/lib/server/db";
import { authOrRedirectMiddleware } from "@/lib/server/middleware";

export const getTodos = createServerFn({ method: "GET" })
  .middleware([authOrRedirectMiddleware])
  .handler(async ({ context: { user } }) => {
    const todos = await db
      .select()
      .from(todo)
      .where(eq(todo.userId, user.id))
      .orderBy(todo.createdAt);

    return todos;
  });

export const createTodo = createServerFn({ method: "POST" })
  .middleware([authOrRedirectMiddleware])
  .inputValidator(createTodoSchema)
  .handler(async ({ data, context: { user } }) => {
    const [newTodo] = await db
      .insert(todo)
      .values({
        id: data.id,
        title: data.title,
        completed: data.completed ?? false,
        userId: user.id,
      })
      .returning();

    return newTodo;
  });

export const updateTodo = createServerFn({ method: "POST" })
  .inputValidator(updateTodoSchema)
  .middleware([authOrRedirectMiddleware])
  .handler(async ({ data, context: { user } }) => {
    const [updatedTodo] = await db
      .update(todo)
      .set(data.updates)
      .where(and(eq(todo.id, data.id), eq(todo.userId, user.id)))
      .returning();

    return updatedTodo;
  });

export const deleteTodo = createServerFn({ method: "POST" })
  .inputValidator(deleteTodoSchema)
  .middleware([authOrRedirectMiddleware])
  .handler(async ({ data, context: { user } }) => {
    await db
      .delete(todo)
      .where(and(eq(todo.id, data.id), eq(todo.userId, user.id)));
  });
