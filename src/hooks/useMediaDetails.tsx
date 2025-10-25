import { useParams } from "react-router-dom";
import { getMovieDetails, getPersonDetails, getTvDetails } from "../utils/tmdbApi";
import { useQuery } from "@tanstack/react-query";
import type { MovieDetails, PersonDetails, TvDetails } from "../types/tmdb.types";

type MediaDetailsMap = {
  movie: MovieDetails;
  tv: TvDetails;
  person: PersonDetails;
};

export default function useMediaDetails<T extends keyof MediaDetailsMap>(mediaType: T) {
  const { id } = useParams();

  return useQuery<MediaDetailsMap[T]>({
    queryKey: ["details", mediaType, id],
    queryFn: async () => {
      if (!id) return;

      if (mediaType === "movie") return getMovieDetails(Number(id));
      if (mediaType === "tv") return getTvDetails(Number(id));
      if (mediaType === "person") return getPersonDetails(Number(id));
    },

    enabled: !!id,
  });
}
