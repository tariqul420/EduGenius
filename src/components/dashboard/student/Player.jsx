"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "sonner";

import { getLesson } from "@/lib/actions/curriculum.action";
import { updateProgress } from "@/lib/actions/progress.action";

export default function Player({ curriculum }) {
  const [mounted, setMounted] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);
  const searchParams = useSearchParams();
  const play = searchParams.get("play");

  // Set initial lesson when component mounts
  useEffect(() => {
    setMounted(true);
    if (!play && curriculum?.lessons?.[0]) {
      setActiveLesson(curriculum.lessons[0]);
    }
  }, [curriculum, play]);

  // const onProgress = (progress) => {
  //   if (!mounted) return;
  //   // Handle progress tracking
  // };

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
        // Fallback to first lesson on error
        if (curriculum?.lessons?.[0]) {
          setActiveLesson(curriculum.lessons[0]);
        }
      }
    };

    fetchLesson();
  }, [play, mounted, curriculum]);

  // Early return while not mounted
  if (!mounted) return null;

  const videoUrl = activeLesson?.videoUrl || curriculum?.lessons?.[0]?.videoUrl;

  return (
    <div className="player-wrapper relative aspect-video">
      {videoUrl && (
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          controls
          playing
          className="absolute top-0 left-0"
          // onProgress={onProgress}
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
