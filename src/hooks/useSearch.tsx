import { useEffect, useState } from "react";
import { tmdbFetch } from "../utils/tmdbApi";
import type { TmdbResponse } from "../types/tmdb.types";

export default function useSearch(query: string) {
  const [data, setData] = useState<TmdbResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (query.length < 3) {
        setData(null);
        return;
      }

      async function fetchData() {
        try {
          setLoading(true);
          setError("");

          const result = await tmdbFetch("/search/multi", { query: query });
          setData(result);
          console.log(result);
        } catch (err) {
          console.error("Error fetching data: ", error);
          setError("Failed to load data. Please try again.");
        } finally {
          setLoading(false);
        }
      }

      fetchData();
    }, 800);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  return { data, loading, error };
}
