import z from "zod";

export const createTodoSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  completed: z.boolean().optional(),
});

export const updateTodoSchema = z.object({
  id: z.string(),
  updates: z.object({
    title: z.string().optional(),
    completed: z.boolean().optional(),
  }),
});

export const deleteTodoSchema = z.object({
  id: z.string(),
});
