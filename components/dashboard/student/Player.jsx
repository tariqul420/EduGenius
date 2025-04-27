"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLesson } from "@/lib/actions/curriculum.action";
import { updateProgress } from "@/lib/actions/progress.action";
import { formUrlQuery } from "@/lib/utils";

export default function Player({ curriculum }) {
  const [mounted, setMounted] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);
  const searchParams = useSearchParams();
  const play = searchParams.get("play");
  const router = useRouter();

  // Set initial lesson when component mounts
  useEffect(() => {
    setMounted(true);

    let newUrl = "";

    if (!play && curriculum?.lessons?.[0]) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "play",
        value: curriculum?.lessons?.[0]?._id,
      });
    }
    router.push(newUrl, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEnded = async () => {
    if (!mounted || !activeLesson?._id) return;

    await updateProgress({
      lessonId: activeLesson._id,
      courseId: activeLesson.course,
      moduleId: activeLesson.module,
    });

    router.refresh();
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
      {videoUrl ? (
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          controls
          playing
          className="absolute top-0 left-0"
          onEnded={onEnded}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
        />
      ) : (
        <Card className="flex h-full flex-col justify-center">
          <CardHeader>
            <CardTitle>No Video Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              No video is available for this lesson. Please check back later or
              contact your instructor for assistance.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
