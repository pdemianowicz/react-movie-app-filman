import { useEffect, useState } from "react";
import { tmdbFetch } from "../utils/tmdbApi";
import type { TmdbResponse } from "../types/tmdb.types";

export function useMediaList(endpoint: string) {
  const [data, setData] = useState<TmdbResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    async function fetchMedia() {
      try {
        const res = await tmdbFetch(endpoint);
        setData(res);
      } catch (err) {
        console.error("Error fetching details:", err);
        setError("Failed to load details. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchMedia();
  }, [endpoint]);

  return { data, loading, error };
}
