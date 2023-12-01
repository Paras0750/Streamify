import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoBox from "./VideoBox";
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

const VideoPlayer = () => {
  // Get the 'id' parameter from the route
  const { id } = useParams();
  const [videoMetaData, setVideoMetaData] = useState<
    VideoMetaData | undefined
  >();
  console.log("videoMetaData Main: ", videoMetaData);

  useEffect(() => {
    if (!id) return;
    getVideo(id)
      .then((res) => {
        console.log("res: ", res);
        setVideoMetaData(res.video);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);

  console.log("videoMetaData: ", videoMetaData);

  return (
    <div>
      <h2>Video Player</h2>

      <p>Playing video with ID: {id}</p>
      {videoMetaData ? (
        <VideoBox videoMetadata={videoMetaData} vidID={videoMetaData?.vidId} />
      ) : (
        " loading ..."
      )}
    </div>
  );
};

export default VideoPlayer;
