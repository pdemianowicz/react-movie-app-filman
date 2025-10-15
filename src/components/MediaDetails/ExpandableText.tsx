import { useState } from "react";

interface ExpandableTextProps {
  children: string;
  maxLength?: number;
}

export default function ExpandableText({ children, maxLength = 550 }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (children.length <= maxLength) {
    return <p>{children}</p>;
  }

  const textToShow = isExpanded ? children : `${children.substring(0, maxLength)}...`;

  return (
    <div>
      <p>{textToShow}</p>
      <button
        type="button"
        className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}
