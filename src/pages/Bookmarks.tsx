import { useEffect, useState } from "react";
import useBookmarks from "../hooks/useBookmarks";
import { tmdbFetch } from "../utils/tmdbApi";
import MediaCard from "../components/MediaCard";
import type { TmdbResults } from "../types/tmdb.types";

export default function BookmarkPage() {
  const { bookmarks } = useBookmarks();
  const [bookmarkedItems, setBookmarkedItems] = useState<TmdbResults[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkedItems = async () => {
      if (bookmarks.length === 0) {
        setBookmarkedItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      const promises = bookmarks.map((bookmark) => tmdbFetch(`/${bookmark.mediaType}/${bookmark.id}`));

      try {
        const results = await Promise.all(promises);
        setBookmarkedItems(results);
      } catch (err) {
        console.error("Failed to fetch bookmarked items", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedItems();
  }, [bookmarks]);

  if (loading) return <div className="text-center py-20">Loading bookmarks...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-xl font-semibold my-4 text-text-primary">My Bookmarks</h1>

      {bookmarkedItems.length > 0 ? (
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
