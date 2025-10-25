import CarouselSkeleton from "./CarouselSkeleton";

export default function MediaDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto md:p-6">
      <div className="flex flex-col md:flex-row md:gap-12 lg:gap-24">
        <div className="w-[250px] h-[350px] md:w-[350px] md:h-[515px] rounded-lg mx-auto mb-4 md:mb-0 bg-surface animate-pulse"></div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="h-10 w-3/4 max-w-lg rounded bg-surface animate-pulse"></div>
            <div className="h-10 w-10 rounded-full bg-surface animate-pulse"></div>
          </div>
          <div className="h-5 w-1/2 max-w-xs rounded bg-surface/70 animate-pulse mt-4"></div>
          <div className="space-y-2 mt-8">
            <div className="h-4 w-full rounded bg-surface/70 animate-pulse"></div>
            <div className="h-4 w-full rounded bg-surface/70 animate-pulse"></div>
            <div className="h-4 w-5/6 rounded bg-surface/70 animate-pulse"></div>
          </div>
          <div className="h-5 w-1/3 max-w-sm rounded bg-surface animate-pulse mt-8"></div>
          <div className="h-11 w-36 rounded-lg bg-surface animate-pulse mt-8"></div>
        </div>
      </div>

      <hr className="my-8 opacity-15" />
      <CarouselSkeleton />
    </div>
  );
}
