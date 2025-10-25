import MediaCardSkeleton from "./MediaCardSkeleton";

export default function PersonDetailsSkeleton() {
  const skeletonItems = [];
  for (let i = 0; i < 10; i++) {
    skeletonItems.push(i);
  }
  return (
    <div className="max-w-6xl mx-auto md:p-6">
      <div className="lg:flex md:gap-12 lg:gap-24">
        <aside className="max-lg:flex gap-4">
          <div className="">
            <div className="rounded-lg w-[150px] h-[225px] md:w-[300px] md:h-[450px] mx-auto bg-surface animate-pulse aspect-square"></div>
            <div className="flex gap-4 mt-4 md:mb-8">
              <div className="w-6 h-6 rounded-full bg-surface animate-pulse"></div>
              <div className="w-6 h-6 rounded-full bg-surface animate-pulse"></div>
              <div className="w-6 h-6 rounded-full bg-surface animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-4 max-md:text-sm mt-2">
            <div className="w-20 h-5 rounded bg-surface animate-pulse"></div>
            <div className="w-32 h-4 rounded bg-surface/70 animate-pulse"></div>

            <div className="w-16 h-5 rounded bg-surface animate-pulse"></div>
            <div className="w-24 h-4 rounded bg-surface/70 animate-pulse"></div>

            <div className="w-24 h-5 rounded bg-surface animate-pulse"></div>
            <div className="w-40 h-4 rounded bg-surface/70 animate-pulse"></div>
          </div>
        </aside>

        <div className="flex-1 max-md:mt-6">
          <div className="h-10 w-3/4 max-w-md rounded bg-surface animate-pulse mb-6"></div>
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-surface/70 animate-pulse"></div>
            <div className="h-4 w-full rounded bg-surface/70 animate-pulse"></div>
            <div className="h-4 w-3/4 rounded bg-surface/70 animate-pulse"></div>
            <div className="h-4 w-5/6 rounded bg-surface/70 animate-pulse"></div>
          </div>

          <div className="mt-8">
            <div className="h-7 w-32 rounded bg-surface animate-pulse mb-4"></div>

            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {skeletonItems.map((i) => (
                <MediaCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
