export default function TodoSkeleton() {
  return (
    <div className="animate-pulse space-y-8 pt-4">
      <div className="h-10 w-1/3 rounded bg-muted" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div className="h-16 rounded bg-muted" key={i} />
        ))}
      </div>
    </div>
  );
}
