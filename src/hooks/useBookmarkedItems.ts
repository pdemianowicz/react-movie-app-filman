import { useQuery } from "@tanstack/react-query";
import useBookmarks from "./useBookmarks";
import { tmdbFetch } from "../utils/tmdbApi";

export default function useBookmarkedItems() {
  const { bookmarks } = useBookmarks();

  return useQuery({
    queryKey: ["bookmarkedItems", bookmarks],
    queryFn: async () => {
      if (bookmarks.length === 0) return [];
      const promises = bookmarks.map((bookmark) => tmdbFetch(`/${bookmark.mediaType}/${bookmark.id}`));
      return Promise.all(promises);
    },
  });
}
