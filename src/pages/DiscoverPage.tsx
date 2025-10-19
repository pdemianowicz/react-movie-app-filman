import { useEffect } from "react";
import MediaCard from "../components/MediaCard";
import useDiscoverMedia from "../hooks/useDiscoverMedia";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

interface DiscoverPageProps {
  mediaType: "movie" | "tv";
}

export default function DiscoverPage({ mediaType }: DiscoverPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isLoading, isError, error, isFetching } = useDiscoverMedia(mediaType, page);
  const media = data?.results || [];
  const totalPages = data?.total_pages || 1;

  const handleSetPage = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  useEffect(() => {
    if (!isFetching) {
      window.scrollTo(0, 0);
    }
  }, [isFetching]);

  if (isLoading) return <div className="text-center py-20">Loading media...</div>;
  if (isError) return <div className="text-center py-20 text-red-400">{error.message}</div>;

  return (
    <>
      <h1 className="text-xl font-semibold text-text-primary mb-2 leading-10">Discover {mediaType === "movie" ? "Movies" : "Serials"}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 py-1">
        {media.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </div>
      {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={handleSetPage} isLoading={isFetching} />}
    </>
  );
}
