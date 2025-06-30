"use client";

import { Sparkle } from "lucide-react"; // Using Sparkle icon from lucide-react
import { useEffect, useState } from "react";

import SparkleIcon from "@/components/icons/sparkle-icon"; // Assuming this is a custom icon
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getPersonalizedRecommendations } from "@/lib/actions/ai.action";

export default function AIRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const data = await getPersonalizedRecommendations();
        setRecommendations(data);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="from-light-bg to-light-bg dark:from-dark-bg dark:to-dark-bg relative flex flex-col rounded-md bg-gradient-to-br p-6"
          >
            <Skeleton className="mb-4 h-6 w-1/3" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-4 h-4 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {recommendations.map((rec, index) => (
        <Card
          key={index}
          className="from-light-bg to-light-bg dark:from-dark-bg dark:to-dark-bg relative flex flex-col bg-gradient-to-br p-6"
        >
          {/* AI Badge */}
          <div className="ai-badge dark:bg-dark-theme absolute top-0.5 right-2 flex items-center gap-1 rounded-full border bg-white px-3 py-1.5 text-xs sm:top-1.5">
            <SparkleIcon className="dark:text-medium-bg text-main h-4 w-4" />
            AI Recommendation
          </div>

          {/* Header with Icon */}
          <div className="mt-3 flex items-center gap-3">
            <Sparkle className="text-main h-5 w-5" />
            <h3 className="dark:text-light-bg text-dark-bg text-lg font-semibold">
              {rec.topic}
            </h3>
          </div>

          {/* Suggestion Text */}
          <p className="dark:text-medium-bg text-dark-bg mt-2 flex-1 text-sm">
            {rec.suggestion}
          </p>

          {/* Confidence Badge */}
          <div className="mt-2">
            <Badge
              variant="success"
              className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
            >
              Confidence: {(rec.confidence * 100).toFixed(2)}%
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}
