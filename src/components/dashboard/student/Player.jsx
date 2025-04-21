"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

import { getLesson } from "@/lib/actions/curriculum.action";

export default function Player({}) {
  const [activeUrl, setActiveUrl] = useState("");
  const searchParams = useSearchParams();
  const play = searchParams.get("play");

  // eslint-disable-next-line no-unused-vars
  const onProgress = (progress) => {
    // console.log("Progress:", progress);
  };

  const onEnded = () => {
    // console.log("Video ended");
  };

  useEffect(() => {
    (async () => {
      if (play) {
        const { videoUrl } = await getLesson({ id: play });
        setActiveUrl(videoUrl);
        // console.log("Video URL:", videoUrl);
      }
    })();
  }, [play]);

  return (
    <div className="player-wrapper relative aspect-video">
      <ReactPlayer
        url={activeUrl}
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
    </div>
  );
}
