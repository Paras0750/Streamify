import { useParams } from "react-router-dom";
import SideNavigationLayout from "../../Components/layout/SideNavigationLayout";
import VideoSection from "../../Components/VideoSection";
import { useEffect, useState } from "react";
import { getFeed } from "../../Services/mainService";
import { VideoStruct } from "../Home/HomePage";

const ChannelView = () => {
  const { channelId } = useParams<string>();
  const [videoFeed, setVideoFeed] = useState<[VideoStruct] | []>([]);

  useEffect(() => {
    getFeed().then((res) => {
      setVideoFeed(res);
      console.log("Received Data: ", res);
    });
  }, []);

  return (
    <SideNavigationLayout>
      <div className="w-full bg-red-100 h-full ">
        <div className="w-full rounded-xl bg-blue-100 h-[35vh] relative">
          <img src="" alt="" />
          <div className="rounded-full bg-green-200 h-60 w-60 absolute -bottom-32 left-14"></div>
        </div>
        <div className="flex mb-60 mt-10 justify-end gap-10">
          <div className="ml-[24vw] dark:text-white items-center">
            <div className="text-2xl font-bold">Channel Name</div>
            <div className="text-xl font-semibold mt-5 ml-4">BIO</div>
          </div>

          <button className="box-border w-2/6 text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[1.5rem] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px] text-[1rem]">
            Subscribe
          </button>
        </div>
        <div className="mt-60">
          <VideoSection videoFeed={videoFeed} />
        </div>
      </div>
    </SideNavigationLayout>
  );
};

export default ChannelView;
