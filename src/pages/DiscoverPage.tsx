import MediaCard from "../components/MediaCard";
import useDiscoverMedia from "../hooks/useDiscoverMedia";
import { useSearchParams } from "react-router-dom";

interface DiscoverPageProps {
  mediaType: "movie" | "tv";
}

export default function DiscoverPage({ mediaType }: DiscoverPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isLoading, isError, error } = useDiscoverMedia(mediaType, page);
  const media = data?.results || [];
  const totalPages = data?.total_pages || 1;

  const handleSetPage = (newPage: number) => {
    const newPageNumber = Math.max(newPage, 1);
    setSearchParams({ page: newPageNumber.toString() });
  };

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
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          type="button"
          onClick={() => handleSetPage(page - 1)}
          disabled={page === 1 || isLoading}
          className="px-4 py-2 bg-surface hover:bg-surface/80 rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Previous page">
          Previous
        </button>

        <span className="text-text-secondary">
          Page {page} of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => handleSetPage(page + 1)}
          disabled={page >= totalPages || isLoading}
          className="px-4 py-2 bg-surface hover:bg-surface/80 rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Next page">
          Next
        </button>
      </div>
      ;
    </>
  );
}
