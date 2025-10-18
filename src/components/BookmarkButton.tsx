import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import useBookmarks, { type Bookmark } from "../hooks/useBookmarks";

export default function BookmarkButton({ id, mediaType }: Bookmark) {
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const item = { id, mediaType };
  const bookmarked = isBookmarked(item);

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(item)}
      className="p-4 hover:bg-surface rounded-full cursor-pointer transition-colors group"
      aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}>
      {bookmarked ? (
        <FaBookmark className="text-gray-300 group-hover:text-text-primary transition-colors" />
      ) : (
        <FaRegBookmark className="text-text-secondary group-hover:text-text-primary transition-colors" />
      )}
    </button>
  );
}
