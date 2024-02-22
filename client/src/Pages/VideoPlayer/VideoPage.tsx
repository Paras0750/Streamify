import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoBox from "./VideoBox";
import { getVideo } from "../../Services/mainService";
import NavigationSlide from "../../Components/SideNavigation";

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
  const { id } = useParams<string>();
  const [videoMetaData, setVideoMetaData] = useState<
    VideoMetaData | undefined
  >();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        if (!id) throw new Error("Invalid video ID");
        setLoading(true);
        const res = await getVideo(id);
        console.log("res: ", res);
        setVideoMetaData(res.video);
      } catch (err) {
        console.error("Error fetching video data: ", err);
      } finally {
        console.log("Finally false");
        setLoading(false);
      }
    };

    fetchVideoData();
    console.log("Component mounted");
  }, [id]);

  return (
    <div className="grid grid-cols-6 px-5 h-full">
      <NavigationSlide />
      <div className="px-8 mx-auto">
        {loading ? (
          "loading..."
        ) : videoMetaData ? (
          <VideoBox
            videoMetadata={videoMetaData}
            vidID={videoMetaData?.vidId}
          />
        ) : (
          <div className="">
            <p> No video data available. </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
