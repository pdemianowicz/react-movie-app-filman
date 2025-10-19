import { tmdbFetch } from "../utils/tmdbApi";
import type { TmdbResponse } from "../types/tmdb.types";
import { useQuery } from "@tanstack/react-query";

export function useMediaList(endpoint: string) {
  return useQuery<TmdbResponse>({
    queryKey: ["mediaList", endpoint],
    queryFn: () => tmdbFetch(endpoint),
  });
}
