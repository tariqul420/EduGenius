"use client";

import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
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

  if (loading) return <div>Loading recommendations...</div>;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {recommendations.map((rec, index) => (
        <Card key={index} className="p-4">
          <h3 className="mb-2 font-semibold">{rec.topic}</h3>
          <p className="text-sm text-gray-600">{rec.suggestion}</p>
          <div className="mt-2 text-xs text-gray-400">
            Confidence: {(rec.confidence * 100).toFixed(2)}%
          </div>
        </Card>
      ))}
    </div>
  );
}
