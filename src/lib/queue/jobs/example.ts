import type { PgBoss } from "pg-boss";
import z from "zod";

export const EXAMPLE_JOBS = {
  EXAMPLE: "example",
} as const;

export const ExamplePayload = z.object({
  name: z.string(),
});

export type ExamplePayload = z.infer<typeof ExamplePayload>;

export async function registerExampleJobs(boss: PgBoss) {
  await boss.createQueue(EXAMPLE_JOBS.EXAMPLE);

  await boss.work<ExamplePayload>(EXAMPLE_JOBS.EXAMPLE, async ([job]) => {
    if (!job.data) {
      throw new Error("Missing job data");
    }

    const { name } = job.data;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    return { message: `Example job completed for ${name}` };
  });
}
