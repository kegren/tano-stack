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
      <div className="mb-4 flex justify-between text-sm">
        <div className="text-muted-foreground">
          <span className="font-medium text-card-foreground">
            {totalCount}
          </span>{" "}
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
      <Progress value={completionPercentage} className="h-2" />
      <div className="mt-2 text-xs text-muted-foreground">
        {completionPercentage.toFixed(0)}% complete
      </div>
    </div>
  );
}
