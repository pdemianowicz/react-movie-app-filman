import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import useBookmarks, { type Bookmark } from "../hooks/useBookmarks";
import { motion, AnimatePresence } from "framer-motion";

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
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={bookmarked ? "bookmarked" : "not-bookmarked"}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}>
          {bookmarked ? (
            <FaBookmark className="text-text-tertiary group-hover:text-text-primary transition-colors" />
          ) : (
            <FaRegBookmark className="text-text-tertiary group-hover:text-text-primary transition-colors" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
