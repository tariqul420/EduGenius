"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "sonner";

import { getLesson } from "@/lib/actions/curriculum.action";
import { updateProgress } from "@/lib/actions/progress.action";

export default function Player() {
  const [mounted, setMounted] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);
  const searchParams = useSearchParams();
  const play = searchParams.get("play");

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const onProgress = (progress) => {
    if (!mounted) return;
    // Handle progress tracking
  };

  const onEnded = async () => {
    if (!mounted || !activeLesson?._id) return;

    await updateProgress({
      lessonId: activeLesson._id,
      courseId: activeLesson.course,
      moduleId: activeLesson.module,
    });
  };

  useEffect(() => {
    if (!mounted || !play) return;

    const fetchLesson = async () => {
      try {
        const lesson = await getLesson({ id: play });
        setActiveLesson(lesson);
      } catch (error) {
        console.error("Failed to fetch lesson:", error);
        toast.error("Failed to load lesson");
      }
    };

    fetchLesson();
  }, [play, mounted]);

  // Early return while not mounted
  if (!mounted) return null;

  return (
    <div className="player-wrapper relative aspect-video">
      {activeLesson?.videoUrl && (
        <ReactPlayer
          url={activeLesson.videoUrl}
          width="100%"
          height="100%"
          controls
          playing
          className="absolute top-0 left-0"
          onProgress={onProgress}
          onEnded={onEnded}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
        />
      )}
    </div>
  );
}
