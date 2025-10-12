import { Link } from "react-router-dom";
import type { CastMember, CrewMember } from "../../types/tmdb.types";

interface MovieCreditsProps {
  cast: CastMember[];
  crew: CrewMember[];
  maxCast?: number;
}

export default function MediaCredits({ cast, crew, maxCast = 3 }: MovieCreditsProps) {
  const topCast = cast.slice(0, maxCast);
  const director = crew.find((member) => member.job === "Director");

  if (topCast.length === 0 && !director) return null;

  return (
    <div className="mt-8 space-y-2 text-sm text-gray-300">
      {director && (
        <div className="flex gap-2">
          <span className=" font-medium min-w-[80px]">Director:</span>
          <Link to={`/person/${director.id}`} className="text-text-secondary hover:text-text-primary transition-colors">
            {director.name}
          </Link>
        </div>
      )}

      {topCast.length > 0 && (
        <div className="flex gap-2">
          <span className="font-medium min-w-[80px]">Starring:</span>
          <span className="text-text-secondary flex max-sm:flex-col gap-1">
            {topCast.map((actor, index) => (
              <span key={actor.id}>
                <Link to={`/person/${actor.id}`} className="hover:text-text-primary transition-colors">
                  {actor.name}
                </Link>
                {index < topCast.length - 1 && ", "}
              </span>
            ))}
          </span>
        </div>
      )}
    </div>
  );
}
