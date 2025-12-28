import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { todo } from "@/db/schema/todos";
import { auth } from "@/features/auth/auth";

export const getTodos = createServerFn({ method: "GET" }).handler(async () => {
  const session = await auth.api.getSession({
    headers: getRequestHeaders(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const todos = await db
    .select()
    .from(todo)
    .where(eq(todo.userId, session.user.id))
    .orderBy(todo.createdAt);

  return todos;
});

const createTodoSchema = z.object({
  title: z.string().min(1),
  completed: z.boolean().optional(),
});

export const createTodo = createServerFn({ method: "POST" })
  .inputValidator(createTodoSchema)
  .handler(async ({ data }) => {
    const session = await auth.api.getSession({
      headers: getRequestHeaders(),
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const [newTodo] = await db
      .insert(todo)
      .values({
        id: crypto.randomUUID(),
        title: data.title,
        completed: data.completed ?? false,
        userId: session.user.id,
      })
      .returning();

    return newTodo;
  });

const updateTodoSchema = z.object({
  id: z.string(),
  updates: z.object({
    title: z.string().optional(),
    completed: z.boolean().optional(),
  }),
});

export const updateTodo = createServerFn({ method: "POST" })
  .inputValidator(updateTodoSchema)
  .handler(async ({ data }) => {
    const session = await auth.api.getSession({
      headers: getRequestHeaders(),
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const [updatedTodo] = await db
      .update(todo)
      .set(data.updates)
      .where(eq(todo.id, data.id))
      .returning();

    return updatedTodo;
  });

const deleteTodoSchema = z.object({
  id: z.string(),
});

export const deleteTodo = createServerFn({ method: "POST" })
  .inputValidator(deleteTodoSchema)
  .handler(async ({ data }) => {
    const session = await auth.api.getSession({
      headers: getRequestHeaders(),
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    await db.delete(todo).where(eq(todo.id, data.id));
  });
