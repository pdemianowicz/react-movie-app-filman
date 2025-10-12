import { Link } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import type { Genre } from "../../types/tmdb.types";

interface MovieMetaProps {
  voteAverage: string;
  releaseDate: string;
  runtime: string;
  genres: Genre[];
}

const Separator = () => <span className="text-text-secondary">|</span>;

export default function MovieMeta({ voteAverage, releaseDate, runtime, genres }: MovieMetaProps) {
  return (
    <div className="mb-4 text-text-secondary text-sm flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1">
        <IoMdStar />
        {voteAverage}
      </span>
      <Separator />
      <span>{releaseDate}</span>
      <Separator />
      <span>{runtime}</span>
      <Separator />
      <div className="flex flex-wrap gap-1">
        {genres.map((genre, index) => (
          <span key={genre.id}>
            <Link to={`/genre/${genre.id}`} className="text-text-secondary hover:text-text-primary transition-colors">
              {genre.name}
            </Link>
            {index < genres.length - 1 && ", "}
          </span>
        ))}
      </div>
    </div>
  );
}
