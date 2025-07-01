"use client";

import { VideoOff } from "lucide-react";
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
        <Card className="flex h-full flex-col justify-center p-8 text-center">
          <CardHeader className="flex flex-col items-center">
            <div className="rounded-full bg-gradient-to-l from-dark-bg to-dark-bg dark:from-dark-main dark:to-dark-btn/70 p-4">
              <VideoOff className="h-10 w-10 text-light-bg dark:text-gray-400" />
            </div>
            <CardTitle className="text-2xl mt-2.5 font-bold">
              No Video Available
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <p className="mx-auto max-w-lg text-gray-600 dark:text-gray-400">
              We couldn&apos;t find any video content for this lesson.
              Please check back later or reach out to your instructor for
              assistance.
            </p>
            {/* <Button variant="outline" className="mt-6">
              <Mail className="mr-2 h-4 w-4" />
              Contact Instructor
            </Button> */}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
