import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { getVideo } from "../../Services/main/main";
import { Send, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import CommentSection from "./CommentSection";

interface VideoMetaData {
  date?: string;
  description: string;
  m3u8: string;
  thumbnail: string;
  title: string;
  username: string;
  vidId: string;
  __v: number;
  _id: string;
}
interface VideoBoxProps {
  vidID: string;
  videoMetadata: VideoMetaData;
}

// http://localhost:3001/getFile/Thumbnails

const VideoBox = (props: VideoBoxProps) => {
  const { vidID, videoMetadata } = props;
  console.log("videoMetadata: ", videoMetadata);

  const [videoURL, setvideoURL] = useState<string>("");

  console.log("videoURL: ", videoURL);
  const selectRef: any = useRef();

  useEffect(() => {
    if (!videoMetadata) return;
    selectManifest();
  }, [videoURL]);

  const selectManifest = (): void => {
    const selected = selectRef.current.value;
    const urlPrefix = `${import.meta.env.VITE_API_STREAM_URL}/api/stream/`;

    if (!videoMetadata || !videoMetadata.m3u8) {
      console.error("Invalid video metadata:", videoMetadata);
      return;
    }

    switch (selected) {
      case "256x144":
        setvideoURL(`${urlPrefix}256x144-output-${videoMetadata.m3u8}`);
        console.log("Set Quality: ", videoURL);
        break;
      case "426x240":
        setvideoURL(`${urlPrefix}426x240-output-${videoMetadata.m3u8}`);
        console.log("Set Quality: ", videoURL);
        break;
      case "640x360":
        setvideoURL(`${urlPrefix}640x360-output-${videoMetadata.m3u8}`);
        console.log("Set Quality: ", videoURL);
        break;
      case "854x480":
        setvideoURL(`${urlPrefix}854x480-output-${videoMetadata.m3u8}`);
        console.log("Set Quality: ", videoURL);
        break;
      case "1280x720":
        setvideoURL(`${urlPrefix}1280x720-output-${videoMetadata.m3u8}`);
        console.log("Set Quality: ", videoURL);
        break;
      case "1920x1080":
        setvideoURL(`${urlPrefix}1920x1080-output-${videoMetadata.m3u8}`);
        console.log("Set Quality: ", videoURL);
        break;
      case "Auto":
        setvideoURL(`${urlPrefix}${videoMetadata.m3u8}`);
        console.log("Set Quality: ", videoURL);
        break;
      default:
        console.log("No Quality: ", videoURL);
        break;
    }
  };

  return (
    <div className="w-[60vw]">
      <div className="relative rounded-full">
        <ReactPlayer
          className="video-player aspect-video rounded-3xl"
          url={videoURL}
          playing={false}
          controls={true}
          height={"70%"}
          width={"100%"}
        />
        <select
          ref={selectRef}
          onChange={selectManifest}
          defaultValue={"1280x720"}
          className="absolute top-[10px] right-[30px] mt-4 ml-6 p-2 bg-white border rounded"
        >
          <option value="256x144">144p</option>
          <option value="426x240">240p</option>
          <option value="640x360">360p</option>
          <option value="854x480">480p</option>
          <option value="1280x720">720p</option>
          <option value="1920x1080">1080p</option>
        </select>
      </div>

      <div className="">
        <div className="flex justify-between items-center my-8">
          <div className="font-bold text-4xl">Title: {videoMetadata.title}</div>
          <div className="flex gap-2">
            <ThumbsUpIcon /> Like
            <ThumbsDownIcon /> Dislike
          </div>
        </div>
        <div className="">Descripion: {videoMetadata.description}</div>
      </div>

      <div className="flex justify-between items-center my-8 shadow-lg px-2 rounded-2xl">
        <div className="flex items-center">
          <img
            className="w-20 h-20 rounded-full"
            src="https://media.geeksforgeeks.org/wp-content/uploads/20230608103241/chrome-capture-2023-5-8.png"
            alt=""
          />
          <div className="font-semibold text-xl ml-2">
            {videoMetadata.username}
          </div>
        </div>
        <div className="bg-red-400 px-4 py-3 rounded-2xl">Subscribe</div>
      </div>

      <CommentSection vidId={videoMetadata.vidId}/>
    </div>
  );
};

export default VideoBox;
