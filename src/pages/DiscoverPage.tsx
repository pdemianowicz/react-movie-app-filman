import { useEffect } from "react";
import MediaCard from "../components/MediaCard";
import useDiscoverMedia from "../hooks/useDiscoverMedia";
import { useSearchParams } from "react-router-dom";
import DiscoverPageSkeleton from "../components/skeletons/DiscoverPageSkeleton";
import SortAndFilterControls from "../components/SortAndFilterControls";
import { useInView } from "react-intersection-observer";
import ScrollToTopButton from "../components/ScrollToTopButton";

interface DiscoverPageProps {
  mediaType: "movie" | "tv";
}

export default function DiscoverPage({ mediaType }: DiscoverPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { ref, inView } = useInView({ rootMargin: "750px" });
  const sortBy = searchParams.get("sortBy") || "popularity.desc";
  const genre = searchParams.get("genre") || "";

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useDiscoverMedia(mediaType, { sortBy, genre });
  const media = data?.pages.flatMap((page) => page.results) || [];

  const handleFilterChange = (key: string, value: string) => {
    const newParams: Record<string, string> = { sortBy, genre };
    newParams[key] = value;
    setSearchParams(newParams);
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <DiscoverPageSkeleton />;
  if (isError) return <div className="text-center py-20 text-red-400">{error.message}</div>;

  return (
    <>
      <div className="flex max-md:flex-col md:items-center justify-between">
        <h1 className="text-xl font-semibold text-text-primary mb-2 leading-10">Discover {mediaType === "movie" ? "Movies" : "Serials"}</h1>
        <SortAndFilterControls mediaType={mediaType} sortBy={sortBy} genre={genre} onFilterChange={handleFilterChange} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 py-1">
        {media.map((item, index) => (
          <MediaCard key={item.id} item={item} index={index} />
        ))}
      </div>
      <ScrollToTopButton />
      <div className="flex justify-center items-center h-20">
        {hasNextPage ? <div ref={ref} /> : <p className="text-text-secondary">No more results</p>}
      </div>
    </>
  );
}
