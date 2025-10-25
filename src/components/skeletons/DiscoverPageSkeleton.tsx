import MediaCardSkeleton from "./MediaCardSkeleton";

export default function DiscoverPageSkeleton() {
  const skeletonItems = [];
  for (let i = 0; i < 12; i++) {
    skeletonItems.push(i);
  }

  return (
    <>
      <div className="flex max-md:flex-col md:items-center justify-between">
        <div className="h-8 w-48 rounded bg-surface animate-pulse"></div>
        <div className="flex items-center justify-center max-md:mb-2 gap-4">
          <div className="h-10 w-32 rounded bg-surface animate-pulse"></div>
          <div className="h-10 w-32 rounded bg-surface animate-pulse"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 py-1">
        {skeletonItems.map((i) => (
          <MediaCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
