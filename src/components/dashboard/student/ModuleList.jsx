"use client";

import { CheckCircle, PlayCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export default function ModulesList({ modules, activeModule, onModuleSelect }) {
  return (
    <div className="bg-card rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Course Modules</h3>
      <div className="space-y-2">
        {modules?.map((videoModule) => (
          <button
            key={videoModule.id}
            onClick={() => onModuleSelect(videoModule)}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-lg transition-colors",
              activeModule?.id === videoModule.id
                ? "bg-primary/10 text-primary"
                : "hover:bg-accent"
            )}
          >
            {videoModule.completed ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <PlayCircle className="h-5 w-5" />
            )}
            <span className="text-sm font-medium">{videoModule.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
