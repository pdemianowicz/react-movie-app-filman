import { useEffect, useState } from "react";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface FetchOpitions {
  query?: string;
  page?: string;
}

export interface TmdbResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export function useTmdbFetch<T>(endpoint: string, options: FetchOpitions) {
  const [data, setData] = useState<TmdbResponse<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { query } = options;

  useEffect(() => {
    async function fetchData() {
      const url = new URL(`${BASE_URL}${endpoint}`);
      url.searchParams.append("api_key", TMDB_API_KEY);
      url.searchParams.append("language", "en-US");
      if (query) url.searchParams.set("query", query);

      try {
        setLoading(true);
        setError("");
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`Response status: ${res.status}`);

        const result = await res.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    if (endpoint === "/search/multi" && (!query || query.length < 3)) {
      return;
    }

    if (endpoint === "/search/multi") {
      const timerId = setTimeout(() => fetchData(), 800);
      return () => clearTimeout(timerId);
    }

    fetchData();
  }, [endpoint, query]);

  return { data, loading, error };
}
