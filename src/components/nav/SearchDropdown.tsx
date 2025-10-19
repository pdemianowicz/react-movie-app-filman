import { Link } from "react-router-dom";
import type { TmdbResults } from "../../types/tmdb.types";
import getImageUrl from "../../utils/getImageUrl";

export interface SearchDropdownProps {
  results: TmdbResults[];
  loading: boolean;
  error: string;
  onLinkClick: () => void;
}

export default function SearchDropdown({ results, loading, error, onLinkClick }: SearchDropdownProps) {
  return (
    <div className="absolute z-10 top-full left-0 right-0 bg-surface rounded-md shadow-lg mt-2">
      {results.slice(0, 4).map((item) => (
        <Link
          to={`/${item.media_type}/${item.id}`}
          key={item.id}
          onClick={onLinkClick}
          className="flex items-center gap-4 px-4 py-2 hover:bg-background/60 cursor-pointer transition-colors">
          <img
            src={getImageUrl(item.poster_path || item.profile_path || null, "w92")}
            alt={item.title || item.name}
            className="w-12 h-16 object-cover rounded-md"
          />
          <span>{item.title || item.name}</span>
        </Link>
      ))}
    </div>
  );
}
