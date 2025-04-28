import { AlertCircle, Rocket, Share2, TrendingUp } from "lucide-react";

import SparkleIcon from "@/components/icons/SparkleIcon";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function AICourseReportCard({ report }) {
  if (!report) return null;

  const { summary, topCourses, improvements, growthTip } = report;

  return (
    <div className="mb-10 space-y-4">
      {/* First Row - Two Cards */}
      <div className="grid grid-cols-12 items-stretch gap-5">
        {/* Summary Card */}
        <Card className="from-light-bg to-light-bg dark:from-dark-bg dark:to-dark-bg relative col-span-12 flex h-full flex-col rounded-md bg-gradient-to-br p-6 sm:col-span-6 lg:col-span-5">
          <div className="ai-badge dark:bg-dark-theme absolute top-0.5 right-2 flex items-center gap-1 rounded-full border bg-white px-3 py-1.5 text-xs sm:top-1.5">
            <SparkleIcon className="dark:text-medium-bg text-main h-4 w-4" />
            AI Insights
          </div>
          <div className="mt-3 flex items-center gap-3">
            <Share2 className="text-main h-5 w-5" />
            <h3 className="dark:text-light-bg text-dark-bg text-lg font-semibold">
              Course Overview
            </h3>
          </div>
          <p className="dark:text-medium-bg text-dark-bg flex-1">{summary}</p>
        </Card>

        {/* Growth Tip */}
        <Card className="from-light-bg to-light-bg dark:from-dark-bg dark:to-dark-bg relative col-span-12 flex h-full flex-col bg-gradient-to-br p-6 sm:col-span-6 lg:col-span-7">
          <div className="ai-badge dark:bg-dark-theme absolute top-0.5 right-2 flex items-center gap-1 rounded-full border bg-white px-3 py-1.5 text-xs sm:top-1.5">
            <SparkleIcon className="dark:text-medium-bg text-main h-4 w-4" />
            AI Recommendations
          </div>
          <div className="mt-3 flex items-center gap-3">
            <Rocket className="text-main h-5 w-5" />
            <h3 className="dark:text-light-bg text-dark-bg text-lg font-semibold">
              Growth Opportunity
            </h3>
          </div>
          <p className="dark:text-medium-bg text-dark-bg flex-1">{growthTip}</p>
        </Card>
      </div>

      {/* Second Row - Two Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Top Performing Courses */}
        <Card className="from-light-bg to-light-bg dark:from-dark-bg dark:to-dark-bg relative flex h-full flex-col bg-gradient-to-br p-6">
          <div className="ai-badge dark:bg-dark-theme absolute top-0.5 right-2 flex items-center gap-1 rounded-full border bg-white px-3 py-1.5 text-xs sm:top-1.5">
            <SparkleIcon className="dark:text-medium-bg text-main h-4 w-4" />
            AI Analysis
          </div>
          <div className="mt-3 flex items-center gap-3">
            <TrendingUp className="text-main h-5 w-5" />
            <h3 className="dark:text-light-bg text-dark-bg text-lg font-semibold">
              Top Performers
            </h3>
          </div>
          <ul className="flex-1 space-y-3">
            {topCourses.map((course, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Badge
                  variant="success"
                  className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                >
                  #{idx + 1}
                </Badge>
                <span className="text-gray-600 dark:text-gray-300">
                  {course}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Improvements */}
        <Card className="from-light-bg to-light-bg dark:from-dark-bg dark:to-dark-bg relative flex h-full flex-col bg-gradient-to-br p-6">
          <div className="ai-badge dark:bg-dark-theme absolute top-0.5 right-2 flex items-center gap-1 rounded-full border bg-white px-3 py-1.5 text-xs sm:top-1.5">
            <SparkleIcon className="dark:text-medium-bg text-main h-4 w-4" />
            AI Suggestions
          </div>
          <div className="mt-3 flex items-center gap-3">
            <AlertCircle className="text-main h-5 w-5" />
            <h3 className="dark:text-light-bg text-dark-bg text-lg font-semibold">
              Areas to Improve
            </h3>
          </div>
          <ul className="flex-1 space-y-3">
            {improvements.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Badge
                  variant="warning"
                  className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200"
                >
                  !
                </Badge>
                <span className="text-gray-600 dark:text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
