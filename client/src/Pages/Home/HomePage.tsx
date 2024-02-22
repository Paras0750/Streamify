import SideNavigation from "../../Components/SideNavigation";
import VideoSection from "../../Components/VideoSection";
import { useEffect, useState } from "react";
import { getFeed } from "../../Services/mainService";

export interface VideoStruct {
  vidId: string;
  date: string;
  description: string;
  thumbnail: string;
  title: string;
  id: string;
  username: string;
}

const Home = () => {
  const [videoFeed, setVideoFeed] = useState<[VideoStruct] | []>([]);

  useEffect(() => {
    getFeed().then((res) => {
      setVideoFeed(res);
    });
  }, []);

  return (
    <div className="grid grid-cols-6 px-5 h-full">
      <div className=" min-h-[100vh] md:block">
        <SideNavigation />
      </div>
      <div className="col-span-5  h-full">
        <div className="p-2 dark:text-white">
          <div className="text-[30px] font-bold mb-4">Video Recommendation</div>
          <VideoSection videoFeed={videoFeed} />
        </div>
      </div>
    </div>
  );
};

export default Home;
