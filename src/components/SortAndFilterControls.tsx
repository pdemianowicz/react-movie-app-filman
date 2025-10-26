import useGenres from "../hooks/useGenres";

interface SortAndFilterControlsProps {
  mediaType: "movie" | "tv";
  sortBy: string;
  genre: string;
  onFilterChange: (key: string, value: string) => void;
}

const movieSortOptions = [
  { value: "popularity.desc", label: "Popularity" },
  { value: "release_date.desc", label: "Newest Releases" },
  { value: "vote_average.desc", label: "Top Rated" },
  { value: "vote_count.desc", label: "Most Voted" },
  { value: "revenue.desc", label: "Highest Revenue" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const tvSortOptions = [
  { value: "popularity.desc", label: "Popularity" },
  { value: "first_air_date.desc", label: "Newest Releases" },
  { value: "vote_average.desc", label: "Top Rated" },
  { value: "vote_count.desc", label: "Most Voted" },
  { value: "original_name.asc", label: "Title (A-Z)" },
];

export default function SortAndFilterControls({ mediaType, sortBy, genre, onFilterChange }: SortAndFilterControlsProps) {
  const { data: genresData } = useGenres(mediaType);
  const sortOptions = mediaType === "movie" ? movieSortOptions : tvSortOptions;

  return (
    <div className="flex items-center justify-center max-md:mb-2 gap-4">
      <select
        name="sort"
        value={sortBy}
        onChange={(e) => onFilterChange("sortBy", e.target.value)}
        className="bg-surface rounded-md pl-2.5 py-1.5 outline-none border-none">
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select
        name="genre"
        value={genre}
        onChange={(e) => onFilterChange("genre", e.target.value)}
        className="bg-surface rounded-md pl-2.5 py-1.5 outline-none border-none">
        <option value="">All Genres</option>
        {genresData?.map((genre) => (
          <option key={genre.id} value={genre.id.toString()}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}
