const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function tmdbFetch(endpoint: string, params?: Record<string, string | number>) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", TMDB_API_KEY);
  url.searchParams.append("language", "en-US");

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, String(value));
    }
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  return res.json();
}

export async function getMovieDetails(id: number) {
  return tmdbFetch(`/movie/${id}`, {
    append_to_response: "credits,videos,images,recommendations,release_dates",
  });
}

export async function getTvDetails(id: number) {
  return tmdbFetch(`/tv/${id}`, {
    append_to_response: "credits,videos,images,recommendations,release_dates",
  });
}

export async function getPersonDetails(id: number) {
  return tmdbFetch(`/person/${id}`, {
    append_to_response: "combined_credits,external_ids",
  });
}
