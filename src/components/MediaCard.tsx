import { Link } from "react-router-dom";
import { DATE_FORMATS, formatDate } from "../utils/dateUtils";
import getImageUrl from "../utils/getImageUrl";
import type { TmdbResults } from "../types/tmdb.types";
import { motion } from "framer-motion";

export interface MediaCardProps {
  item: TmdbResults;
  index?: number;
}

export default function MediaCard({ item, index = 0 }: MediaCardProps) {
  const title = item.title || item.name;
  const mediaType = item.media_type || (item.first_air_date ? "Tv" : "Movie");
  const posterUrl = item?.poster_path ? item?.poster_path : null;
  const year = formatDate(item.release_date || item.first_air_date, DATE_FORMATS.year);
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/A";

  return (
    <motion.div
      className="snap-start group"
      initial={index < 18 ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}>
      <Link to={`/${mediaType}/${item.id}`} className="group relative block w-full h-full">
        <div className="w-full aspect-[2/3] relative rounded overflow-hidden shadow-lg">
          {/* image */}
          <img
            src={getImageUrl(posterUrl, "w185")}
            alt={`Poster for ${title}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* overlay hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>

          {/* rating badge */}
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            ⭐ {rating}
          </div>
        </div>
        <div className="mt-0.5">
          <p className="text-text-primary font-semibold truncate group-hover:underline cursor-pointer">{title}</p>
          <p className="text-xs text-text-secondary">
            {mediaType.toUpperCase()}
            {` • `}
            {year}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
