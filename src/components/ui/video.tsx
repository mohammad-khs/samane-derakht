"use client";
import { FC, useRef, useState } from "react";

interface VideoProps {
  vidoAddress: string;
}

const Video: FC<VideoProps> = ({ vidoAddress }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // const handleTogglePlayPause = () => {
  //   if (videoRef.current) {
  //     if (isPlaying) {
  //       videoRef.current.pause();
  //       videoRef.current.currentTime = 0;
  //     } else {
  //       videoRef.current.play();
  //     }
  //     setIsPlaying(!isPlaying);
  //   }
  // };
  return (
    <>
      <div className="relative w-full aspect-video">
        <video
          ref={videoRef}
          className="rounded-3xl w-full h-full object-cover"
          controls
          preload="metadata"
        >
          <source src={vidoAddress} type="video/mp4" />
          مرورگر شما این ویدیو را ساپورت نمیکند
        </video>
      </div>
      {/* <button
          onClick={handleTogglePlayPause}
          className={`absolute inset-0 m-auto w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-xl transition-opacity duration-300 ${
            isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
          } hover:opacity-100`}
          style={{ zIndex: 10 }}
        >
          {isPlaying ? "⏹️" : "▶️"} 
        </button> */}
    </>
  );
};

export default Video;
