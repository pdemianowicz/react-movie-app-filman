export default function MediaCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="aspect-[2/3] w-full rounded-lg bg-surface animate-pulse"></div>

      <div className="h-4 w-3/4 rounded bg-surface animate-pulse"></div>
      <div className="h-3 w-1/2 rounded bg-surface animate-pulse"></div>
    </div>
  );
}
