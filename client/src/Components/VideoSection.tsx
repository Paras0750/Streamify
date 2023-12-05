import { useEffect, useState } from "react";
import VideoBlock from "./VideoCard";
import { getFeed } from "../Services/main/main";

interface VideoStruct {
  vidId: string;
  date: string;
  description: string;
  thumbnail: string;
  title: string;
  id: string;
  username: string;
}

const VideoSection = () => {
  const [videoFeed, setVideoFeed] = useState<[VideoStruct] | []>([]);


  useEffect(() => {
    getFeed().then((res) => {
      setVideoFeed(res);
      console.log("Received Data: ", res);
    });
  }, []);

  return (
    <div className="p-2 dark:text-white">
      <div className="text-[30px] font-bold mb-4">Video Recommendation</div>
      <div className="grid md:grid-cols-3 px-8">
        {videoFeed.map((video) => {
          return (
            <VideoBlock
              key={video.vidId}
              vidId={video.vidId}
              title={video.title}
              thumbnail={video.thumbnail}
              username={video.username}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VideoSection;
