import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { tmdbFetch } from "../utils/tmdbApi";
import type { TmdbResponse } from "../types/tmdb.types";

export default function useDiscoverMedia(mediaType: "movie" | "tv", page: number) {
  return useQuery<TmdbResponse>({
    queryKey: ["discover", mediaType, page],
    queryFn: () => tmdbFetch(`/discover/${mediaType}`, { page: page }),

    placeholderData: keepPreviousData,
  });
}
