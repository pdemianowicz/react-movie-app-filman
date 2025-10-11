import type { SearchResult } from "./SearchBar";

export interface SearchDropdownProps {
  results: SearchResult[];
  loading: boolean;
  error: string;
}

const BASE_IMG_URL = "https://image.tmdb.org/t/p";

export default function SearchDropdown({ results, loading, error }: SearchDropdownProps) {
  return (
    <div className="absolute top-full left-0 right-0 bg-surface rounded-md shadow-lg mt-2">
      {results.slice(0, 4).map((item) => (
        <div key={item.id} className="flex items-center gap-4 px-4 py-2 hover:bg-background/60 cursor-pointer transition-colors">
          <img
            src={`${BASE_IMG_URL}/w92/${item.poster_path || item.profile_path}`}
            alt={item.title || item.name}
            className="w-12 h-16 object-cover rounded-md"
          />
          <span>{item.title || item.name}</span>
        </div>
      ))}
    </div>
  );
}
