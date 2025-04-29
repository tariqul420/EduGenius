"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { generateLearningPath } from "@/lib/actions/ai.action";

export default function LearningPath() {
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLearningPath() {
      try {
        const result = await generateLearningPath();
        setPath(result);
      } catch (error) {
        console.error("Failed to fetch learning path:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLearningPath();
  }, []);

  if (loading) {
    return <div className="animate-pulse">Loading your learning path...</div>;
  }

  return (
    <div className="space-y-4">
      {path.map((category, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{category.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={category.confidence} className="mb-4" />

            {category.mastered.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium">Mastered Topics:</h4>
                <ul className="list-disc pl-5 text-sm">
                  {category.mastered.map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>
              </div>
            )}

            {category.inProgress.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium">In Progress:</h4>
                <ul className="list-disc pl-5 text-sm">
                  {category.inProgress.map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="font-medium">Next Steps:</h4>
              <ul className="list-disc pl-5 text-sm">
                {category.recommendedNext.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
