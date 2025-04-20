"use client";

import { CheckCircle, PlayCircle } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export default function ModulesList({ curriculum, activeModule }) {
  return (
    <div className="bg-card rounded-lg p-4">
      <h3 className="mb-4 text-lg font-semibold">{curriculum?.name}</h3>
      <div className="space-y-2">
        {curriculum?.lessons?.map((videoModule) => (
          <button
            key={videoModule.id}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg p-3 transition-colors",
              activeModule?.id === videoModule.id
                ? "bg-primary/10 text-primary"
                : "hover:bg-accent",
            )}
          >
            {videoModule.completed ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <PlayCircle className="h-5 w-5" />
            )}
            <Link
              href={`?play=${videoModule?.title}`}
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
