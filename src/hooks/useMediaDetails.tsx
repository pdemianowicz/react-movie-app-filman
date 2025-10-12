import { useEffect, useState } from "react";
import type { MediaDetails, MovieDetails, PersonDetails, TvDetails } from "../types/tmdb.types";
import { useParams } from "react-router-dom";
import { getMovieDetails, getPersonDetails, getTvDetails } from "../utils/tmdbApi";

type MediaDetailsMap = {
  movie: MovieDetails;
  tv: TvDetails;
  person: PersonDetails;
};

export default function useMovieDetails<T extends keyof MediaDetailsMap>(mediaType: T) {
  const [data, setData] = useState<MediaDetailsMap[T] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    setData(null);
    setLoading(true);
    setError("");

    async function fetchData() {
      try {
        let result: MediaDetails | null = null;
        if (mediaType === "movie") result = await getMovieDetails(Number(id));
        if (mediaType === "tv") result = await getTvDetails(Number(id));
        if (mediaType === "person") result = await getPersonDetails(Number(id));
        setData(result as MediaDetailsMap[T]);
      } catch (err) {
        console.error("Error fetching details:", err);
        setError("Failed to load details. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [mediaType, id]);

  return { data, loading, error };
}
