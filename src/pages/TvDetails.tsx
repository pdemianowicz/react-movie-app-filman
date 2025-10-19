import { useRef } from "react";
import MediaCarousel from "../components/MediaCarousel";
import MediaCredits from "../components/MediaDetails/MediaCredits";
import MovieCast from "../components/MediaDetails/MovieCast";
import MovieMeta from "../components/MediaDetails/MovieMeta";
import useMovieDetails from "../hooks/useMediaDetails";
import { formatDate, formatRuntime } from "../utils/dateUtils";
import getImageUrl from "../utils/getImageUrl";
import BookmarkButton from "../components/BookmarkButton";

export default function TvDetails() {
  const { data, isLoading, isError, error } = useMovieDetails("tv");
  const trailerRef = useRef<HTMLHRElement>(null);

  const handleClick = () => trailerRef.current?.scrollIntoView({ behavior: "smooth" });

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (isError) return <div className="text-center py-20 text-red-400">{error.message}</div>;
  if (!data) return <div className="text-center py-20">No data found.</div>;

  const title = data?.name;
  const overview = data?.overview;
  const releaseDate = formatDate(data?.first_air_date);
  const runtime = formatRuntime(data?.last_episode_to_air.runtime);
  const genres = data?.genres;
  const posterUrl = data?.poster_path;
  const voteAverage = data?.vote_average?.toFixed(1) ?? "N/A";
  const suggestedItems = data?.recommendations?.results ?? data?.similar?.results ?? [];
  const cast = data?.credits?.cast ?? [];
  const crew = data?.credits?.crew ?? [];
  const images = (data?.images?.backdrops ?? []).slice(0, 6);
  const trailer = data?.videos?.results.find((video) => video.type === "Trailer");

  console.log(suggestedItems);

  return (
    <div className="max-w-6xl mx-auto md:p-6">
      <div className="flex flex-col md:flex-row md:gap-12 lg:gap-24">
        <img src={getImageUrl(posterUrl, "w400")} alt={title} className="rounded-lg max-w-[250px] md:max-w-[350px] w-full mx-auto mb-4 md:mb-0" />
        <div className="text-gray-300">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text-primary">{title}</h1>
            <BookmarkButton id={data.id} mediaType="tv" />
          </div>
          <MovieMeta voteAverage={voteAverage} releaseDate={releaseDate} runtime={runtime} genres={genres} />
          <p className="mt-8">{overview}</p>
          <MediaCredits cast={cast} crew={crew} maxCast={3} />

          <div className="mt-8">
            <button
              type="button"
              onClick={handleClick}
              className="bg-accent/85 text-text-primary font-medium px-6 py-2.5 rounded-lg cursor-pointer hover:bg-accent/75">
              Play Trailer
            </button>
          </div>
        </div>
      </div>
      {suggestedItems.length > 0 && (
        <>
          <hr className="my-8 opacity-15" />
          <div className="mt-4">
            <MediaCarousel title="You might also like" data={suggestedItems} />
          </div>
        </>
      )}
      {cast.length > 0 ? (
        <>
          <hr className="my-8 opacity-15" />
          <MovieCast cast={cast} initialCount={7} />
        </>
      ) : (
        <>
          <hr className="my-8 opacity-15" />
          <h2 className="text-xl font-semibold text-text-primary">Cast</h2>
          <p className="text-gray-400">No cast available.</p>
        </>
      )}
      <hr ref={trailerRef} className="my-8 opacity-15" />
      <h2 className="text-xl font-semibold text-text-primary">Video</h2>
      {trailer ? (
        <div className="aspect-video mt-4">
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
      ) : (
        <p className="text-gray-400">No trailer available.</p>
      )}
      <hr className="my-8 opacity-15" />
      <h2 className="text-xl font-semibold text-text-primary">Images</h2>
      {images.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {images.map((img) => (
            <img
              key={img.file_path}
              src={getImageUrl(img.file_path, "w400")}
              alt="backdrop image"
              loading="lazy"
              className="w-full rounded-md hover:opacity-75 transition ease-in-out duration-150 cursor-pointer"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No images available.</p>
      )}
    </div>
  );
}
