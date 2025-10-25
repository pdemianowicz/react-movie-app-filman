import MediaCardSkeleton from "./MediaCardSkeleton";

export default function CarouselSkeleton() {
  const skeletonItems = [];
  for (let i = 0; i < 8; i++) {
    skeletonItems.push(i);
  }

  return (
    <div className="mb-8 md:mb-12">
      <div className="h-7 w-48 rounded bg-surface animate-pulse mb-4"></div>

      <div className="grid grid-flow-col overflow-x-hidden py-1 snap-x snap-mandatory carousel-container">
        {skeletonItems.map((i) => (
          <MediaCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
