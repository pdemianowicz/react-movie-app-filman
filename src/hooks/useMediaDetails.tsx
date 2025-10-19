import { useParams } from "react-router-dom";
import { getMovieDetails, getPersonDetails, getTvDetails } from "../utils/tmdbApi";
import { useQuery } from "@tanstack/react-query";

export default function useMovieDetails(mediaType: "movie" | "tv" | "person") {
  const { id } = useParams();

  return useQuery({
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
