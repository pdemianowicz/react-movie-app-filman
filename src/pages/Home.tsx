import MediaCarousel from "../components/MediaCarousel";
import HomePageSkeleton from "../components/skeletons/HomePageSkeleton";
import { useMediaList } from "../hooks/useMediaList";

export default function Home() {
  const { data: trendingData, isLoading: isTrendingLoading, isError: isTrendingError } = useMediaList("/trending/all/week");
  const { data: popularMovieData, isLoading: isPopularMoviesLoading, isError: isPopularMoviesError } = useMediaList("/movie/popular");
  const { data: popularTvData, isLoading: isPopularTvLoading, isError: isPopularTvError } = useMediaList("/tv/popular");
  const { data: upcomingData, isLoading: isUpcomingLoading, isError: isUpcomingError } = useMediaList("/movie/upcoming");

  const isLoading = isTrendingLoading || isPopularMoviesLoading || isPopularTvLoading || isUpcomingLoading;
  const isError = isTrendingError || isPopularMoviesError || isPopularTvError || isUpcomingError;

  const trending = trendingData?.results || [];
  const popularTv = popularTvData?.results || [];
  const popularMovies = popularMovieData?.results || [];
  const upcomingMovies = upcomingData?.results || [];

  if (isLoading) return <HomePageSkeleton />;
  if (isError) return <div className="text-center py-20 text-red-400">Failed to load content. Please refresh the page.</div>;

  return (
    <div className="space-y-8 md:space-y-12">
      <MediaCarousel title="Trending Now" data={trending} />
      <MediaCarousel title="Popular Movies" data={popularMovies} />
      <MediaCarousel title="Popular TV Shows" data={popularTv} />
      <MediaCarousel title="Upcoming Movies" data={upcomingMovies} />
    </div>
  );
}
