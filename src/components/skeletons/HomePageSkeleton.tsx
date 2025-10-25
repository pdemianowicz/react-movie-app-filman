import CarouselSkeleton from "./CarouselSkeleton";

export default function HomePageSkeleton() {
  return (
    <div className="space-y-8 md:space-y-12">
      <CarouselSkeleton />
      <CarouselSkeleton />
      <CarouselSkeleton />
      <CarouselSkeleton />
    </div>
  );
}
