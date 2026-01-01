import { describe, expect, it } from "vitest";
import {
  createTodoSchema,
  deleteTodoSchema,
  updateTodoSchema,
} from "@/features/todos/types/todo-types";

describe("todos schemas", () => {
  it("createTodoSchema rejects empty title", () => {
    expect(() => createTodoSchema.parse({ id: "1", title: "" })).toThrow();
  });

  it("updateTodoSchema allows partial updates", () => {
    expect(() =>
      updateTodoSchema.parse({ id: "1", updates: { completed: true } })
    ).not.toThrow();
  });

  it("deleteTodoSchema requires id", () => {
    expect(() => deleteTodoSchema.parse({})).toThrow();
  });
});
