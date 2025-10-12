import MediaCarousel from "../components/MediaCarousel";
import type { SearchResult } from "../components/nav/SearchBar";
import { useTmdbFetch } from "../hooks/useTmdbFetch";

export default function Home() {
  const { data: trendingData } = useTmdbFetch<SearchResult>("/trending/all/week");
  const { data: popularMovieData } = useTmdbFetch<SearchResult>("/movie/popular");
  const { data: popularTvData } = useTmdbFetch<SearchResult>("/tv/popular");
  const { data: upcomingData } = useTmdbFetch<SearchResult>("/movie/upcoming");

  const trending = trendingData?.results || [];
  const popularTv = popularTvData?.results || [];
  const popularMovies = popularMovieData?.results || [];
  const upcomingMovies = upcomingData?.results || [];

  return (
    <div className="space-y-8 md:space-y-12">
      <MediaCarousel title="Trending Now" data={trending} />
      <MediaCarousel title="Popular Movies" data={popularMovies} />
      <MediaCarousel title="Popular TV Shows" data={popularTv} />
      <MediaCarousel title="Upcoming Movies" data={upcomingMovies} />
    </div>
  );
}
