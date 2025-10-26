import { useInfiniteQuery } from "@tanstack/react-query";
import { tmdbFetch } from "../utils/tmdbApi";
import type { TmdbResponse } from "../types/tmdb.types";

export default function useDiscoverMedia(mediaType: "movie" | "tv", options: { sortBy: string; genre: string }) {
  const { sortBy, genre } = options;
  return useInfiniteQuery<TmdbResponse>({
    queryKey: ["discover", mediaType, sortBy, genre],

    queryFn: ({ pageParam = 1 }) => {
      const page = pageParam as number;
      const params: Record<string, string | number> = {
        page,
        sort_by: sortBy,
      };

      if (genre) params.with_genres = genre;
      if (sortBy === "vote_average.desc") params["vote_count.gte"] = 300;

      return tmdbFetch(`/discover/${mediaType}`, params);
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
}
