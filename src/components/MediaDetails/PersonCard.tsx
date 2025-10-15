import { Link } from "react-router-dom";
import AvatarPlaceholder from "../../assets/img/user.png";
import getImageUrl from "../../utils/getImageUrl";

interface CardMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface PersonCardProps {
  item: CardMember;
}

export default function PersonCard({ item }: PersonCardProps) {
  const imageSrc = item.profile_path ? getImageUrl(item.profile_path, "w185") : AvatarPlaceholder;

  return (
    <Link to={`/person/${item.id}`} className="w-32 group">
      <div className="">
        <img
          src={imageSrc}
          alt={item.name}
          className="aspect-square rounded-full object-cover group-hover:opacity-75 transition ease-in-out duration-150 cursor-pointer"
          loading="lazy"
        />
        <span className="text-text-primary font-medium text-sm block mt-1 group-hover:underline">{item.name}</span>
        <span className="text-text-secondary font-medium text-xs block">{item.character}</span>
      </div>
    </Link>
  );
}
