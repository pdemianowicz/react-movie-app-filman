import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { tmdbFetch } from "../utils/tmdbApi";
import type { TmdbResponse } from "../types/tmdb.types";

export default function useDiscoverMedia(mediaType: "movie" | "tv", options: { page: number; sortBy: string; genre: string }) {
  const { page, sortBy, genre } = options;
  return useQuery<TmdbResponse>({
    queryKey: ["discover", mediaType, page, sortBy, genre],
    queryFn: () => {
      const params: Record<string, string | number> = {
        page: page,
        sort_by: sortBy,
      };

      if (genre) {
        params.with_genres = genre;
      }

      return tmdbFetch(`/discover/${mediaType}`, params);
    },

    placeholderData: keepPreviousData,
  });
}
