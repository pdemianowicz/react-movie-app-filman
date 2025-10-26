import { useEffect, useState } from "react";

export const STORAGE_KEY = "Filman_bookmarks";

export interface Bookmark {
  id: number;
  mediaType: string;
}

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const storage = localStorage.getItem(STORAGE_KEY);
      return storage ? JSON.parse(storage) : [];
    } catch (error) {
      console.error("Failed to parse bookmarks from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = ({ id, mediaType }: Bookmark) => {
    return bookmarks.some((bookmark) => bookmark.id === id && bookmark.mediaType === mediaType);
  };

  const toggleBookmark = (item: Bookmark) => {
    if (isBookmarked(item)) {
      setBookmarks((prev) => prev.filter((bookmark) => !(bookmark.id === item.id && bookmark.mediaType === item.mediaType)));
    } else {
      setBookmarks((prev) => [...prev, item]);
    }
  };

  return { bookmarks, isBookmarked, toggleBookmark };
}
