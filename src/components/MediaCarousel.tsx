import { useEffect, useRef, useState } from "react";
import MediaCard from "./MediaCard";
import type { SearchResult } from "./nav/SearchBar";
import { LuChevronLeft } from "react-icons/lu";
import { LuChevronRight } from "react-icons/lu";

export interface MediaCarouselProps {
  title: string;
  data: SearchResult[];
}

export default function MediaCarousel({ title, data }: MediaCarouselProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;

    const buffer = 10;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - buffer);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      checkScrollButtons();
      container.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);

      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, [data]);

  const calculateScrollAmount = () => {
    if (!containerRef.current) return 0;

    const containerWidth = containerRef.current.clientWidth;
    return containerWidth * 0.8;
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -calculateScrollAmount(), behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current?.scrollBy({ left: calculateScrollAmount(), behavior: "smooth" });
    }
  };

  if (!data || data.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-text-primary">{title}</h2>

        {/* Scroll Buttons */}
        <div className="flex">
          <button
            type="button"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="text-2xl w-10 h-10 flex items-center justify-center hover:bg-surface rounded transition-colors duration-200 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed disabled:bg-transparent"
            aria-label="Scroll left">
            <LuChevronLeft />
          </button>

          <button
            type="button"
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="text-2xl w-10 h-10 flex items-center justify-center hover:bg-surface rounded transition-colors duration-200 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed disabled:bg-transparent"
            aria-label="Scroll right">
            <LuChevronRight />
          </button>
        </div>
      </div>

      {/* Media Card */}
      <div ref={containerRef} className="grid grid-flow-col overflow-x-hidden py-1 snap-x snap-mandatory carousel-container">
        {data.map((item, index) => (
          <MediaCard key={item.id + index} item={item} />
        ))}
      </div>
    </section>
  );
}
