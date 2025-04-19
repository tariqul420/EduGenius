"use client";

import ReactPlayer from "react-player";

export default function Player({ url, onProgress, onEnded }) {
  return (
    <div className="player-wrapper relative aspect-video">
      <ReactPlayer
        url={url}
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
