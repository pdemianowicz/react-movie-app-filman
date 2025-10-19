import { useState } from "react";
import type { CastMember } from "../../types/tmdb.types";
import PersonCard from "./PersonCard";

interface MovieCastProps {
  cast: CastMember[];
  initialCount: number;
}

export default function MovieCast({ cast, initialCount = 8 }: MovieCastProps) {
  const [showAll, setShowAll] = useState(false);

  if (!cast || cast.length === 0) return null;

  const displayedCast = showAll ? cast : cast.slice(0, initialCount);
  const hasMore = cast.length > initialCount;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-text-primary">Cast</h2>

        {hasMore && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
            {showAll ? "Show Less" : `View All (${cast.length})`}
          </button>
        )}
      </div>

      <div className={`flex flex-wrap gap-8  ${displayedCast.length > 6 ? "justify-around" : ""}`}>
        {displayedCast.map((member, index) => (
          <PersonCard key={`${member.id}-${index}`} item={member} />
        ))}
      </div>
    </>
  );
}
