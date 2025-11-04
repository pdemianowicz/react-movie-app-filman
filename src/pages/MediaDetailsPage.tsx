import { useRef, useState } from "react";
import useMediaDetails from "../hooks/useMediaDetails";
import MediaDetailsSkeleton from "../components/skeletons/MediaDetailsSkeleton";
import { formatDate, formatRuntime } from "../utils/dateUtils";
import ImageWithLoader from "../components/skeletons/ImageWithLoader";
import getImageUrl from "../utils/getImageUrl";
import BookmarkButton from "../components/BookmarkButton";
import MovieMeta from "../components/MediaDetails/MovieMeta";
import MediaCredits from "../components/MediaDetails/MediaCredits";
import MediaCarousel from "../components/MediaCarousel";
import MovieCast from "../components/MediaDetails/MovieCast";
import Section from "../components/MediaDetails/Section";
import ImageModal from "../components/ImageModal";

interface MediaDetailsPageProps {
  mediaType: "movie" | "tv";
}

export default function MediaDetailsPage({ mediaType }: MediaDetailsPageProps) {
  const { data, isLoading, isError, error } = useMediaDetails(mediaType);
  const trailerRef = useRef<HTMLHRElement>(null);

  // image modal state and handlers
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const handleImageClick = (imgPath: string) => setSelectedImg(getImageUrl(imgPath, "original"));
  const closeModal = () => setSelectedImg(null);

  const handleClick = () => trailerRef.current?.scrollIntoView({ behavior: "smooth" });

  if (isLoading) return <MediaDetailsSkeleton />;
  if (isError) return <div className="text-center py-20 text-red-400">{error.message}</div>;
  if (!data) return <div className="text-center py-20">No data found.</div>;

  const title = "title" in data ? data.title : data.name;
  const releaseDate = formatDate("release_date" in data ? data.release_date : data.first_air_date);
  const runtime = formatRuntime("runtime" in data ? data.runtime : data.last_episode_to_air?.runtime);

  const posterUrl = data.poster_path;
  const voteAverage = data.vote_average?.toFixed(1) ?? "N/A";
  const suggestedItems = data.recommendations?.results ?? data.similar?.results ?? [];
  const cast = data.credits?.cast ?? [];
  const crew = data.credits?.crew ?? [];
  const images = (data.images?.backdrops ?? []).slice(0, 6);
  const trailer = data.videos?.results.find((video) => video.type === "Trailer");

  return (
    <div className="max-w-6xl mx-auto md:p-6">
      <div className="flex flex-col md:flex-row md:gap-12 lg:gap-24">
        <ImageWithLoader
          src={getImageUrl(posterUrl, "w400")}
          alt={title}
          className="w-[250px] h-[350px] md:w-[350px] md:h-[515px] rounded-lg mx-auto mb-4 md:mb-0 aspect-[2/3]"
        />
        <div className="text-text-tertiary">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text-primary">{title}</h1>
            <BookmarkButton id={data.id} mediaType={mediaType} />
          </div>
          <MovieMeta voteAverage={voteAverage} releaseDate={releaseDate} runtime={runtime} genres={data.genres} />
          {data.overview && <p className="mt-8">{data.overview}</p>}
          <MediaCredits cast={cast} crew={crew} maxCast={3} />
          <div className="mt-8">
            <button
              type="button"
              onClick={handleClick}
              className="bg-accent/85 text-white font-medium px-6 py-2.5 rounded-lg cursor-pointer hover:bg-accent/75">
              Play Trailer
            </button>
          </div>
        </div>
      </div>

      <hr className="my-8 opacity-15" />
      {suggestedItems.length > 0 ? (
        <MediaCarousel title="You might also like" data={suggestedItems} />
      ) : (
        <>
          <h2 className="text-xl font-semibold text-text-primary">You might also like</h2>
          <p className="text-text-tertiary">No suggestions available.</p>
        </>
      )}

      <hr className="my-8 opacity-15" />
      {cast.length > 0 ? (
        <MovieCast cast={cast} initialCount={7} />
      ) : (
        <>
          <h2 className="text-xl font-semibold text-text-primary">Cast</h2>
          <p className="text-text-tertiary">No cast available.</p>
        </>
      )}

      <div ref={trailerRef}>
        <Section title="Video" condition={!!trailer} fallbackMessage="No trailer available.">
          <div className="aspect-video mt-4">
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${trailer?.key}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          </div>
        </Section>
      </div>

      <Section title="Images" condition={images.length > 0} fallbackMessage="No images available.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {images.map((img) => (
            <img
              key={img.file_path}
              src={getImageUrl(img.file_path, "w400")}
              alt="backdrop image"
              loading="lazy"
              onClick={() => handleImageClick(img.file_path)}
              className="w-full rounded-md hover:opacity-75 transition ease-in-out duration-150 cursor-pointer"
            />
          ))}
        </div>
      </Section>

      <ImageModal isOpen={!!selectedImg} imgUrl={selectedImg} onClose={closeModal} />
    </div>
  );
}
