import { useEffect, useState } from "react";
import MediaCard from "../components/MediaCard";
import useDiscoverMedia from "../hooks/useDiscoverMedia";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import useGenres from "../hooks/useGenres";

interface DiscoverPageProps {
  mediaType: "movie" | "tv";
}

export default function DiscoverPage({ mediaType }: DiscoverPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const [sortBy, setSortBy] = useState("popularity.desc");
  const [selectedGenre, setSelectedGenre] = useState("");

  const options = {
    page: page,
    sortBy: sortBy,
    genre: selectedGenre,
  };

  const { data, isLoading, isError, error, isFetching } = useDiscoverMedia(mediaType, options);
  const media = data?.results || [];
  const totalPages = data?.total_pages || 1;

  const { data: genresData } = useGenres(mediaType);

  const handleSetPage = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  useEffect(() => {
    if (!isFetching) {
      window.scrollTo(0, 0);
    }
  }, [isFetching]);

  useEffect(() => {
    if (page !== 1) {
      handleSetPage(1);
    }
  }, [sortBy, selectedGenre]);

  if (isLoading) return <div className="text-center py-20">Loading media...</div>;
  if (isError) return <div className="text-center py-20 text-red-400">{error.message}</div>;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-text-primary mb-2 leading-10">Discover {mediaType === "movie" ? "Movies" : "Serials"}</h1>
        <div className="flex items-center gap-4">
          <select
            name="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface rounded-md pl-2.5 py-1.5 outline-none border-none">
            <option value="popularity.desc">Popularity</option>
            <option value="release_date.desc">Newest Releases</option>
            <option value="vote_average.desc">Top Rated</option>
            <option value="vote_count.desc">Most Voted</option>
            <option value="revenue.desc">Highest Revenue</option>
            <option value="original_title.asc">Title (A-Z)</option>
          </select>
          <select
            name="genre"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-surface rounded-md pl-2.5 py-1.5 outline-none border-none">
            <option value="">All Genres</option>
            {genresData?.map((genre) => (
              <option key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 py-1">
        {media.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </div>
      {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={handleSetPage} isLoading={isFetching} />}
    </>
  );
}
