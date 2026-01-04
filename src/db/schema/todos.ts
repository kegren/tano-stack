import { boolean, index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const todo = pgTable(
  "todo",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    completed: boolean("completed").default(false).notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("todo_user_id_idx").on(table.userId),
    index("todo_created_at_idx").on(table.createdAt),
    index("todo_user_completed_idx").on(table.userId, table.completed),
  ]
);

export type Todo = typeof todo.$inferSelect;
export type NewTodo = typeof todo.$inferInsert;
