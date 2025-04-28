import { CloudLightning, Rocket, Share2, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function AICourseReportCard({ report }) {
  if (!report) return null;

  const { summary, topCourses, improvements, growthTip } = report;

  return (
    <div className="space-y-4">
      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
        <div className="mb-2 flex items-center gap-3">
          <Share2 className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-900">
            Course Overview
          </h3>
        </div>
        <p className="text-gray-600">{summary}</p>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Top Performing Courses */}
        <Card className="border-l-4 border-green-400 p-6">
          <div className="mb-4 flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold">Top Performers</h3>
          </div>
          <ul className="space-y-3">
            {topCourses.map((course, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Badge
                  variant="success"
                  className="bg-green-100 text-green-700"
                >
                  #{idx + 1}
                </Badge>
                <span className="text-gray-700">{course}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Improvements */}
        <Card className="border-l-4 border-amber-400 p-6">
          <div className="mb-4 flex items-center gap-3">
            <CloudLightning className="h-5 w-5 text-amber-600" />
            <h3 className="text-lg font-semibold">Areas to Improve</h3>
          </div>
          <ul className="space-y-3">
            {improvements.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Badge
                  variant="warning"
                  className="bg-amber-100 text-amber-700"
                >
                  !
                </Badge>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Growth Tip */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 p-6">
        <div className="mb-2 flex items-center gap-3">
          <Rocket className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-purple-900">
            Growth Opportunity
          </h3>
        </div>
        <p className="text-gray-600">{growthTip}</p>
      </Card>
    </div>
  );
}
