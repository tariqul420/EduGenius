"use client";

import { useEffect, useState } from "react";

import SparkleIcon from "@/components/icons/SparkleIcon";
import { Button } from "@/components/ui/button";
import { getDescriptionRecommendations } from "@/lib/actions/ai.action";

export default function AIDescription({ title, category, level, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        if (!title || !category || !level) {
          setSuggestions([]);
          return;
        }

        setLoading(true);
        const descriptions = await getDescriptionRecommendations({
          title,
          category,
          level,
        });
        setSuggestions(descriptions);
      } catch (error) {
        console.error("Error fetching descriptions:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [title, category, level]);

  return (
    <div className="space-y-4">
      {loading && (
        <div className="text-muted-foreground flex items-center gap-2">
          <SparkleIcon className="h-4 w-4 animate-pulse" />
          Generating suggestions...
        </div>
      )}

      {suggestions && suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="bg-card hover:bg-accent rounded-lg border p-4"
        >
          <div className="mb-2 flex items-start justify-between">
            <SparkleIcon className="text-primary mt-1 h-4 w-4" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSelect?.(suggestion.value)}
            >
              Use This
            </Button>
          </div>
          <p className="text-sm whitespace-pre-line">{suggestion.value}</p>
        </div>
      ))}
    </div>
  );
}
