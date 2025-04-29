"use client";

import { BookOpen, CheckCircle, PauseCircle, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ModulesList({ curriculum }) {
  const searchParams = useSearchParams();
  const play = searchParams.get("play");

  return (
    <Card className="bg-card min-h-screen rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {curriculum?.name || "Modules"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!curriculum?.lessons || curriculum?.lessons.length === 0 ? (
          <div className="bg-light-bg dark:bg-dark-bg flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 py-4 text-center dark:border-gray-700">
            <BookOpen className="dark:text-light-bg mb-4 h-10 w-10 text-black" />
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              No Modules Available
            </h3>
            <p className="mb-4 max-w-md px-2.5 text-justify text-sm text-gray-500 dark:text-gray-400">
              The course content isn&apos;t ready yet. Please check back later
              or contact your instructor for updates.
            </p>
          </div>
        ) : (
          <div className="max-h-96 space-y-2 overflow-y-auto pr-2">
            {curriculum.lessons.map((videoModule) => (
              <button
                key={videoModule._id}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg p-3 transition-colors",
                  play === videoModule?._id
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-accent",
                )}
              >
                {videoModule.isFinished ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : play === videoModule?._id ? (
                  <PauseCircle className="h-5 w-5" />
                ) : (
                  <PlayCircle className="h-5 w-5" />
                )}
                <Link
                  href={`?play=${videoModule?._id}`}
                  className="text-start text-sm font-medium"
                >
                  {videoModule.title}
                </Link>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
