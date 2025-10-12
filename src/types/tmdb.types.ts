export interface TmdbResponse {
  page: number;
  results: TmdbResults[];
  total_pages: number;
  total_results: number;
}

export interface TmdbResults {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  profile_path?: string;
  overview?: string;
  media_type?: string;
  first_air_date?: string;
  last_episode_to_air?: {
    runtime: number;
  };
  release_date?: string;
  vote_average?: number;
  genres?: Genre[];
  credits?: Credits;
  runtime?: number;
  videos?: {
    results: Video[];
  };
  images?: Images;
  recommendations?: {
    results: TmdbResults[];
  };
  similar?: {
    results: TmdbResults[];
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  key: string;
  site: string;
  type: string;
  name: string;
  official: boolean;
  id: number;
}

export interface Image {
  file_path: string;
  aspect_ratio: number;
  height: number;
  width: number;
  vote_average: number;
  vote_count: number;
}

export interface Images {
  backdrops: Image[];
  posters: Image[];
  logos: Image[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

interface BaseMediaDetails {
  id: number;
  backdrop_path: string | null;
  genres: Genre[];
  overview: string;
  poster_path: string;
  vote_average: number;
  credits?: Credits;
  videos?: {
    results: Video[];
  };
  images?: Images;
}

export interface MovieDetails extends BaseMediaDetails {
  title: string;
  release_date: string;
  runtime: number;
  video: boolean;
  recommendations?: {
    results: MovieDetails[];
  };
  similar?: {
    results: MovieDetails[];
  };
}

export interface TvDetails extends BaseMediaDetails {
  name: string;
  first_air_date: string;
  episode_run_time: number[];
  last_episode_to_air: {
    runtime: number;
  };
  recommendations?: {
    results: TvDetails[];
  };
  similar?: {
    results: TvDetails[];
  };
}

export interface PersonDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  homepage: string | null;
  known_for_department: string;
  place_of_birth: string | null;
  profile_path: string | null;
  external_ids?: {
    facebook_id: string | null;
    instagram_id: string | null;
    twitter_id: string | null;
    tiktok_id: string | null;
    youtube_id: string | null;
  };
  combined_credits?: {
    cast: Array<{
      id: number;
      title?: string;
      name?: string;
      media_type: "movie" | "tv";
      poster_path: string;
      release_date?: string;
      first_air_date?: string;
      popularity: number;
    }>;
  };
  images?: {
    profiles: Image[];
  };
}

export type MediaDetails = MovieDetails | TvDetails | PersonDetails;

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  media_type: "movie";
}

export interface TvShow {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  media_type: "tv";
}
