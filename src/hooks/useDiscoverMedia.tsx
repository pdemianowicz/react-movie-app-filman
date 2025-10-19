import { useQuery } from "@tanstack/react-query";
import { tmdbFetch } from "../utils/tmdbApi";
import type { TmdbResponse } from "../types/tmdb.types";

export default function useDiscoverMedia(mediaType: "movie" | "tv") {
  return useQuery<TmdbResponse>({
    queryKey: ["discover", mediaType],
    queryFn: () => tmdbFetch(`/discover/${mediaType}`),
  });
}
