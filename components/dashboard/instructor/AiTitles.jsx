"use client";
import { useEffect, useState } from "react";

import SparkleIcon from "@/components/icons/SparkleIcon";
import { getTitleRecommendations } from "@/lib/actions/ai.action";

export default function AiTitles({ title, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        if (!title || title.length < 3) {
          setSuggestions([]);
          return;
        }

        setLoading(true);
        const results = await getTitleRecommendations(title);
        setSuggestions(results);
      } catch (error) {
        console.error("Error fetching title suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [title]);

  return (
    <div className="w-full">
      {loading && (
        <div className="text-muted-foreground flex justify-center items-center gap-2">
          <SparkleIcon className="h-4 w-4 animate-pulse" />
          Generating suggestions...
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="bg-background mt-1 w-full shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              className="hover:bg-muted flex w-full items-center gap-2 p-2 text-left"
              onClick={() => {
                onSelect?.(suggestion.value);
                setSuggestions([]);
              }}
            >
              <SparkleIcon className="text-primary h-4 w-4" />
              {suggestion.value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
