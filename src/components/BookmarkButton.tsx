import { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

const STORAGE_KEY = "Filman_bookmarks";

export interface Bookmark {
  id: number;
  mediaType: string;
}

export default function BookmarkButton({ id, mediaType }: Bookmark) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const storage = localStorage.getItem(STORAGE_KEY);
      return storage ? JSON.parse(storage) : [];
    } catch (error) {
      console.error("Failed to parse bookmarks from localStorage", error);
      return [];
    }
  });
  const isBookmarked = bookmarks.some((bookmark) => bookmark.id === id && bookmark.mediaType === mediaType);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleToggleBookmark = () => {
    if (isBookmarked) {
      setBookmarks((prev) => prev.filter((item) => !(item.id === id && item.mediaType === mediaType)));
    } else {
      const newBookmark = { id, mediaType };
      setBookmarks((prev) => [...prev, newBookmark]);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggleBookmark}
      className="p-4 hover:bg-surface rounded-full cursor-pointer transition-colors group"
      aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}>
      {isBookmarked ? (
        <FaBookmark className="text-gray-300 group-hover:text-text-primary transition-colors" />
      ) : (
        <FaRegBookmark className="text-text-secondary group-hover:text-text-primary transition-colors" />
      )}
    </button>
  );
}
