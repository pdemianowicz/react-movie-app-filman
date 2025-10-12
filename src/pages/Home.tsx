import MediaCarousel from "../components/MediaCarousel";
import { useMediaList } from "../hooks/useMediaList";

export default function Home() {
  const { data: trendingData } = useMediaList("/trending/all/week");
  const { data: popularMovieData } = useMediaList("/movie/popular");
  const { data: popularTvData } = useMediaList("/tv/popular");
  const { data: upcomingData } = useMediaList("/movie/upcoming");

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
