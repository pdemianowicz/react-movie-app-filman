import { useState } from "react";
import MediaCard from "../components/MediaCard";
import ExpandableText from "../components/MediaDetails/ExpandableText";
import SocialLinks from "../components/MediaDetails/SocialLinks";

import useMovieDetails from "../hooks/useMediaDetails";
import { calculateAge, formatDate } from "../utils/dateUtils";
import getImageUrl from "../utils/getImageUrl";

const InfoItem = ({ label, value }: { label: string; value: string | number | null }) => (
  <div>
    <dt className="font-semibold">{label}</dt>
    <dd>{value}</dd>
  </div>
);

export default function PersonDetails() {
  const { data, isLoading, isError, error } = useMovieDetails("person");
  const [showAll, setShowAll] = useState(false);

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (isError) return <div className="text-center py-20 text-red-400">{error.message}</div>;
  if (!data) return <div className="text-center py-20">No data found.</div>;

  console.log(data);

  const name = data?.name;
  const bio = data?.biography;
  const profileUrl = data?.profile_path;
  const knownFor = data?.known_for_department;
  const birthday = formatDate(data?.birthday);
  const birthPlace = data?.place_of_birth;
  const age = calculateAge(data?.birthday);
  const ageDisplay = age !== null ? (data?.deathday ? `(died at ${age})` : `${age} years old`) : null;
  const knownForMedia = data?.combined_credits?.cast.filter((item) => item.poster_path).sort((a, b) => b.popularity - a.popularity) ?? [];
  const itemsToDisplay = showAll ? knownForMedia : knownForMedia.slice(0, 10);
  const socialLinks = { ...data?.external_ids, homepage: data?.homepage };

  return (
    <div className="max-w-6xl mx-auto md:p-6">
      <div className="lg:flex md:gap-12 lg:gap-24">
        <aside className="max-lg:flex gap-4">
          <div className="">
            <img
              src={getImageUrl(profileUrl, "w400")}
              alt={data.name}
              className="rounded-lg max-w-[150px] md:max-w-[300px] w-full mx-auto object-cover"
            />
            <div className="mt-4 md:mb-8">
              <SocialLinks externalIds={socialLinks} />
            </div>
          </div>
          <dl className="space-y-4 max-md:text-sm mt-2">
            <InfoItem label="Known For" value={knownFor} />

            <InfoItem label="Age" value={ageDisplay} />
            <InfoItem label="Birthday" value={birthday} />
            <InfoItem label="Place of Birth" value={birthPlace} />
          </dl>
        </aside>
        <div className="flex-1 text-gray-300 max-md:mt-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h1 className="text-3xl md:text-4xl font-semibold text-text-primary">{name}</h1>
          </div>
          <ExpandableText>{bio}</ExpandableText>
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Known For</h2>

              {/* Show All Button */}
              {knownForMedia.length > 10 && (
                <button
                  type="button"
                  onClick={() => setShowAll(!showAll)}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
                  {showAll ? "Show Less" : `View All (${knownForMedia.length})`}
                </button>
              )}
            </div>

            <div className="mt-3 grid-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {itemsToDisplay.map((item) => (
                <div key={`${item.media_type}-${item.id}`} className="">
                  <MediaCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
