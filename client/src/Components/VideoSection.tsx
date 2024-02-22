import { VideoStruct } from "../Pages/Home/HomePage";
import VideoBlock from "./VideoCard";

interface VideoSectionProps {
  videoFeed: VideoStruct[];
}

const VideoSection = (props: VideoSectionProps) => {
  const videoFeed = props.videoFeed;
  return (
    <div className="grid md:grid-cols-3 px-8">
      {videoFeed.map((video) => {
        return (
          <VideoBlock
            key={video.vidId}
            vidId={video.vidId}
            title={video.title}
            thumbnail={video.thumbnail}
            username={video.username}
            date={video.date}
          />
        );
      })}
    </div>
  );
};

export default VideoSection;
