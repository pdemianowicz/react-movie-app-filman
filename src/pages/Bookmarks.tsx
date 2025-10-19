import useBookmarks from "../hooks/useBookmarks";
import { tmdbFetch } from "../utils/tmdbApi";
import MediaCard from "../components/MediaCard";
import { useQuery } from "@tanstack/react-query";

export default function BookmarkPage() {
  const { bookmarks } = useBookmarks();
  const {
    data: bookmarkedItems,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookmarkedItems", bookmarks],
    queryFn: async () => {
      if (bookmarks.length === 0) return [];

      const promises = bookmarks.map((bookmark) => tmdbFetch(`/${bookmark.mediaType}/${bookmark.id}`));
      return Promise.all(promises);
    },
  });

  if (isLoading) return <div className="text-center py-20">Loading bookmarks...</div>;
  if (isError) return <div className="text-center py-20 text-red-400">Error: {error.message}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-xl font-semibold my-4 text-text-primary">My Bookmarks</h1>

      {bookmarkedItems && bookmarkedItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {bookmarkedItems.map((movie) => (
            <MediaCard key={movie.id} item={movie} />
          ))}
        </div>
      ) : (
        <p className="text-center text-text-secondary">You haven't bookmarked any items yet.</p>
      )}
    </div>
  );
}
