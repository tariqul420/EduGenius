"use client";

import { CheckCircle, PauseCircle, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

export default function ModulesList({ curriculum }) {
  const searchParams = useSearchParams();
  const play = searchParams.get("play");

  return (
    <div className="bg-card rounded-lg p-4">
      <h3 className="mb-4 text-lg font-semibold">{curriculum?.name}</h3>
      <div className="max-h-96 space-y-2 overflow-y-auto pr-2">
        {curriculum?.lessons?.map((videoModule) => (
          <button
            key={videoModule._id}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg p-3 transition-colors",
              play === videoModule?._id
                ? "bg-primary/10 text-primary"
                : "hover:bg-accent",
            )}
          >
            {videoModule.completed ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : play === videoModule?._id ? (
              <PauseCircle className="h-5 w-5" />
            ) : (
              <PlayCircle className="h-5 w-5" />
            )}
            <Link
              href={`?play=${videoModule?._id}`}
              className="text-sm font-medium"
            >
              {videoModule.title}
            </Link>
          </button>
        ))}
      </div>
    </div>
  );
}
