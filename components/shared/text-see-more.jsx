"use client";

import { useState } from "react";

export default function TextSeeMore({ description }) {
  const [lineCount, setLineCount] = useState(5);

  // Estimate lines by character count (tuned for prose-sm in ~500px container)
  const charsPerLine = 80;
  const estimatedLines = Math.ceil(description.length / charsPerLine);
  const showSeeMore = estimatedLines > lineCount;

  const handleSeeMore = () => {
    setLineCount(lineCount + (lineCount + 5));
  };

  return (
    <div className="prose prose-sm text-muted-foreground whitespace-pre-wrap">
      <div
        style={{
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: lineCount,
        }}
      >
        {description}
      </div>
      {showSeeMore && (
        <button
          onClick={handleSeeMore}
          className="text-dark-btn hover:underline"
        >
          ... see more
        </button>
      )}
      {lineCount >= estimatedLines && lineCount > 5 && (
        <button
          onClick={() => setLineCount(5)}
          className="text-dark-btn ml-2 hover:underline"
        >
          See less
        </button>
      )}
    </div>
  );
}
