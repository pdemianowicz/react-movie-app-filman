import { useEffect, useState } from "react";
import { tmdbFetch } from "../utils/tmdbApi";
import type { TmdbResponse } from "../types/tmdb.types";
import { useQuery } from "@tanstack/react-query";

export default function useSearch(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  return useQuery<TmdbResponse>({
    queryKey: ["search", debouncedQuery],
    queryFn: () => {
      return tmdbFetch("/search/multi", { query: debouncedQuery });
    },

    enabled: debouncedQuery.length >= 3,
  });
}
