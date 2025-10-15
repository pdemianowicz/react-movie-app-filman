import { FaInstagram, FaFacebook, FaTwitter, FaGlobeEurope } from "react-icons/fa";

interface SocialLinksProps {
  externalIds: {
    homepage?: string | null;
    facebook_id?: string | null;
    instagram_id?: string | null;
    twitter_id?: string | null;
  };
}

export default function SocialLinks({ externalIds }: SocialLinksProps) {
  const links = [
    { name: "Instagram", url: externalIds.instagram_id ? `https://www.instagram.com/${externalIds.instagram_id}` : null, Icon: FaInstagram },
    { name: "Twitter", url: externalIds.twitter_id ? `https://twitter.com/${externalIds.twitter_id}` : null, Icon: FaTwitter },
    { name: "Facebook", url: externalIds.facebook_id ? `https://www.facebook.com/${externalIds.facebook_id}` : null, Icon: FaFacebook },
    { name: "Website", url: externalIds.homepage ? externalIds.homepage : null, Icon: FaGlobeEurope },
  ];

  const activeLinks = links.filter((link) => link.url);
  if (activeLinks.length === 0) return null;

  return (
    <div className="flex gap-3 mt-4">
      {activeLinks.map((link) => (
        <a
          key={link.name}
          href={link.url!}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-full transition-all text-text-secondary hover:text-text-primary pr-2 md:pr-4"
          aria-label={link.name}
          title={link.name}>
          <link.Icon className="text-xl md:text-2xl group-hover:scale-125 transition-transform" />
        </a>
      ))}
    </div>
  );
}
