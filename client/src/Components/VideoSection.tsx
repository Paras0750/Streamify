import { useEffect, useState } from "react";
import VideoBlock from "./VideoCard";
import { getFeed } from "../Services/main/main";

// date: "2023-11-30T20:09:30.000Z";
// description: "Here is the description";
// m3u8: "1701374954687.m3u8";
// thumbnail: "/Users/parasnauriyal/Desktop/Streamify/server/mainServer/S3Bucket/Thumbnails/testUser-thumbnail.png";
// title: "Test Video";
// username: "testUser";
// vidId: "96cebc92-91a4-4844-ab22-c68610550ca4";
// __v: 0;
// _id: "6568ebfa2a3bed9be35b0091";

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
