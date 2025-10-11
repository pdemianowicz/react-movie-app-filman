import { LuSearch } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import SearchDropdown from "./SearchDropdown";
import { useTmdbFetch } from "../../hooks/useTmdbFetch";

export interface SearchBarProps {
  onClose?: () => void;
}

export interface SearchResult {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  profile_path: string;
  overview: string;
  media_type: string;
}

export default function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, loading, error } = useTmdbFetch<SearchResult>("/search/multi", { query: query });

  const results = data?.results || [];

  const filteredData = results.filter(
    (item: SearchResult) =>
      (item.media_type === "movie" && item.poster_path) ||
      (item.media_type === "tv" && item.poster_path) ||
      (item.media_type === "person" && item.profile_path)
  );

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  return (
    <div className="flex items-center gap-2 absolute lg:relative left-0 right-0 max-lg:top-5 bg-surface px-2">
      <button type="button" onClick={onClose} title="Close search bar" className="lg:hidden w-10 h-10 rounded-full hover:bg-slate-700 cursor-pointer">
        <IoIosArrowBack className="w-5 h-5 mx-2 text-text-secondary" />
      </button>
      <div className="flex items-center bg-background rounded-xl lg:mr-4 w-full transition-all duration-200 focus-within:ring-2 focus-within:ring-slate-700">
        <LuSearch className="text-text-secondary mx-2" />
        <div className="flex-1 w-full">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search (Press '/' to focus)"
            autoComplete="off"
            spellCheck="false"
            className="w-full lg:w-64 py-2.5 lg:py-1.5 outline-none text-sm"
          />
        </div>
      </div>

      <SearchDropdown results={filteredData} loading={loading} error={error} />
    </div>
  );
}
