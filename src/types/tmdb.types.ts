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
