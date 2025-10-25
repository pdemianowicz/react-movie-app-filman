import { useQuery } from "@tanstack/react-query";
import { tmdbFetch } from "../utils/tmdbApi";
import type { Genre } from "../types/tmdb.types";

export default function useGenres(mediaType: "movie" | "tv") {
  return useQuery<Genre[]>({
    queryKey: ["genres", mediaType],
    queryFn: async () => {
      const data = await tmdbFetch(`/genre/${mediaType}/list`);
      return data.genres;
    },
    staleTime: Infinity,
  });
}
