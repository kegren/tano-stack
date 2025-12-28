import { Progress } from "@/components/ui/progress";

export default function Stats({
  totalCount,
  activeCount,
  completedCount,
}: {
  totalCount: number;
  activeCount: number;
  completedCount: number;
}) {
  const completionPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="mb-4 flex justify-between space-x-2 text-sm">
        <div className="text-muted-foreground">
          <span className="font-medium text-card-foreground">{totalCount}</span>{" "}
          total
        </div>
        <div className="text-muted-foreground">
          <span className="font-medium text-card-foreground">
            {activeCount}
          </span>{" "}
          active
        </div>
        <div className="text-muted-foreground">
          <span className="font-medium text-card-foreground">
            {completedCount}
          </span>{" "}
          completed
        </div>
      </div>
      <Progress className="h-2" value={completionPercentage} />
      <div className="mt-2 text-muted-foreground text-xs">
        {completionPercentage.toFixed(0)}% complete
      </div>
    </div>
  );
}
