import { useState } from "react";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className: string;
}

export default function ImageWithLoader({ src, alt, className }: ImageWithLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && <div className="absolute inset-0 bg-surface animate-pulse rounded-lg"></div>}

      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
