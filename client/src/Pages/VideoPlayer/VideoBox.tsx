import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { getVideo } from "../../Services/main/main";

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
// import 'video-react/dist/video-react.css'; // import the styles

const VideoBox = (props) => {
  const { vidID, videoMetadata} = props;
  const [videoURL, setvideoURL] = useState<string>("");
    
    // "http://localhost:3002/api/stream/1701441992060-output-1920x1080.m3u8"
  // const videoURL2 = `${import.meta.env.VITE_API_STREAM_URL}/api/stream/${videoMetadata.m3u8}`;
  console.log("videoURL: ", videoURL);
  const selectRef: any = useRef();


  useEffect(() => {
    if (!videoMetadata) return;
    selectManifest();
    // getVideo(vidID)
    //   .then((res) => {
    //     setManifest(res.video);
    //     console.log("res: ", res.video);
    //   })
    //   .catch((err) => {
    //     console.log("err: ", err);
    //   });
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
  <div className="">
    <div className="relative aspect-video" style={{margin: "0%", padding: "0% 2%"}}>
      <ReactPlayer
        className="video-player w-full h-full"
        url={videoURL}
        playing={false}
        controls={true}
        height={"70%"}
        width={"100%"}
        // style={{background: "black"}}
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
    <div className="h-[100px]">
      
    </div>
  </div>
);


};

export default VideoBox;
