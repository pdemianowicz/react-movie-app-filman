import { Link } from "react-router-dom";
import { DATE_FORMATS, formatDate } from "../utils/dateUtils";
import getImageUrl from "../utils/getImageUrl";
import type { TmdbResults } from "../types/tmdb.types";

export interface MediaCardProps {
  item: TmdbResults;
}

export default function MediaCard({ item }: MediaCardProps) {
  const title = item.title || item.name;
  const mediaType = item.media_type || (item.first_air_date ? "Tv" : "Movie");
  const posterUrl = item?.poster_path ? item?.poster_path : null;
  const year = formatDate(item.release_date || item.first_air_date, DATE_FORMATS.year);
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/A";

  return (
    <div className="snap-start flex-shrink-0 group">
      <div className="w-full aspect-[2/3] group relative rounded overflow-hidden shadow-lg">
        <Link to={`${mediaType}/${item.id}`} className="group relative block flex-shrink-0 w-full h-full">
          {/* image */}
          <img
            src={getImageUrl(posterUrl, "w300")}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* overlay hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>

          {/* rating badge */}
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            ⭐ {rating}
          </div>
        </Link>
      </div>
      <div className="mt-0.5">
        <p className="text-text-primary font-semibold truncate group-hover:underline cursor-pointer">{title}</p>
        <p className="text-xs text-text-secondary">
          {mediaType.toUpperCase()}
          {` • `}
          {year}
        </p>
      </div>
    </div>
  );
}
