import MediaCard from "../components/MediaCard";
import useDiscoverMedia from "../hooks/useDiscoverMedia";

interface DiscoverPageProps {
  mediaType: "movie" | "tv";
}

export default function DiscoverPage({ mediaType }: DiscoverPageProps) {
  const { data, isLoading, isError, error } = useDiscoverMedia(mediaType);
  const media = data?.results || [];

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
    </>
  );
}
