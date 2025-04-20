"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ReactPlayer from "react-player";

export default function Player({
  // url = "https://videos.pexels.com/video-files/31588906/13461258_2560_1440_60fps.mp4",
  videoUrl = "https://videos.pexels.com/video-files/31588906/13461258_2560_1440_60fps.mp4",
}) {
  const searchParams = useSearchParams();
  const play = searchParams.get("play");

  const onProgress = (progress) => {
    // console.log("Progress:", progress);
  };

  const onEnded = () => {
    // console.log("Video ended");
  };

  useEffect(() => {
    console.log("Play:", play);
  }, [play]);

  return (
    <div className="player-wrapper relative aspect-video">
      <ReactPlayer
        url={videoUrl}
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
