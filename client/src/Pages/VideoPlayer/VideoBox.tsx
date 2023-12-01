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
  const { vidID, videoMetadata } = props;

  console.log("videoMetadata Box: ", videoMetadata);
  
  const [videoURL, setvideoURL] = useState<string>(""
    // "http://localhost:3002/api/stream/1701441992060-output-1920x1080.m3u8"
  );

    
  // const videoURL2 = `${import.meta.env.VITE_API_STREAM_URL}/api/stream/${videoMetadata.m3u8}`;
  console.log("videoURL: ", videoURL);
  
  // console.log("videoMetadata: ",  videoMetadata);

  // const videoRef: any = useRef();
  const selectRef: any = useRef();
  // const [manifest, setManifest] = useState<string>(videoMetadata.m3u8);

  // const [mainManifestUrl, setMainManifestUrl] = useState<string>();
  // console.log("mainManifestUrl: ", mainManifestUrl);
  // const currentResolution = useRef();

  useEffect(() => {
    if (!videoMetadata) return;
    selectManifest();
    // getVideo(vidID)
    //   .then((res) => {
    //     console.log("res: ", res);
    //     setVideoMetaData(res.video);
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

    const manifestID = videoMetadata.m3u8.split(".")[0];

    switch (selected) {
      case "256x144":
        setvideoURL(`${urlPrefix}${manifestID}-output-256x144.m3u8`);
        console.log("Set Quality: ", videoURL); 
        break;
      case "426x240":
        setvideoURL(`${urlPrefix}${manifestID}-output-426x240.m3u8`);
        console.log("Set Quality: ", videoURL); 
        break;
      case "640x360":
        setvideoURL(`${urlPrefix}${manifestID}-output-640x360.m3u8`);
        console.log("Set Quality: ", videoURL); 
        break;
      case "854x480":
        setvideoURL(`${urlPrefix}${manifestID}-output-854x480.m3u8`);
        console.log("Set Quality: ", videoURL); 
        break;
      case "1280x720":
        setvideoURL(`${urlPrefix}${manifestID}-output-1280x720.m3u8`);
        console.log("Set Quality: ", videoURL); 
        break;
      case "1920x1080":
        setvideoURL(`${urlPrefix}${manifestID}-output-1920x1080.m3u8`);
        console.log("Set Quality: ", videoURL); 
        break;
      case "Auto":
        setvideoURL(`${urlPrefix}-${manifestID}-output-1280x720.m3u8`);
        console.log("Set Quality: ", videoURL); 
        break;
      default:
        break;
    }
  };


  return (
    <>
      <div className="video-player">
        <ReactPlayer url={videoURL} controls={true} width="50%" height="50%" />
        <select
          ref={selectRef}
          onChange={selectManifest}
          defaultValue={videoMetadata?.m3u8 || "Auto"}
        >
          <option value={videoMetadata.m3u8}>Auto</option>
          <option value="256x144">144p</option>
          <option value="426x240">240p</option>
          <option value="640x360">360p</option>
          <option value="854x480">480p</option>
          <option value="1280x720">720p</option>
          <option value="1920x1080">1080p</option>
        </select>
      </div>
    </>
  );
};

export default VideoBox;
