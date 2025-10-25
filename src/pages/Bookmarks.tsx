import MediaCard from "../components/MediaCard";
import { BookmarksSkeleton } from "../components/skeletons/BookmarksSkeleton";
import useBookmarkedItems from "../hooks/useBookmarkedItems";

export default function BookmarkPage() {
  const { data: bookmarkedItems, isLoading, isError, error } = useBookmarkedItems();

  if (isLoading) return <BookmarksSkeleton />;
  if (isError) return <div className="text-center py-20 text-red-400">Error: {error.message}</div>;

  return (
    <>
      <h1 className="text-xl font-semibold text-text-primary mb-2 leading-10">My Bookmarks</h1>

      {bookmarkedItems && bookmarkedItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {bookmarkedItems.map((movie, index) => (
            <MediaCard key={movie.id} item={movie} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-center text-text-secondary">You haven't bookmarked any items yet.</p>
      )}
    </>
  );
}
