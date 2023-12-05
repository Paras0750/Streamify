import { useState, useEffect } from "react";
import { getChannel } from "../Services/main/main";
import { useNavigate } from "react-router-dom";
interface VideoBlockProps {
  title: string;
  vidId: string;
  thumbnail: string;
  username: string;
}


const VideoBlock = (props: VideoBlockProps) => {
  const { title, vidId, thumbnail, username } = props;
  const [displayPic, setDisplayPic] = useState<string>();

  const navigate = useNavigate();

  const pathWithoutPrefix = thumbnail.replace(
    "Users/parasnauriyal/Desktop/Streamify/server/mainServer/S3Bucket/Thumbnails/",
    ""
  );
  const thumbnailUrl = `${
    import.meta.env.VITE_API_MAIN_SERVER
  }/thumbnails/Thumbnails/${pathWithoutPrefix}`;

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    getChannel(username, config)
      .then((res) => {
        const dp = res.data.channel.displayPic;
        const pathWithoutPref = dp.replace(
          "/Users/parasnauriyal/Desktop/Streamify/server/mainServer/S3Bucket/",
          ""
        );
        const dpURL = `${
          import.meta.env.VITE_API_MAIN_SERVER
        }/thumbnails/${pathWithoutPref}`;

        setDisplayPic(dpURL);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  });

  return (
    <div className="p-5">
      <div
        className="relative max-w-[350px] flex justify-center items-center bg-black rounded-2xl "
        onClick={() => {
          navigate(`/playVideo/${vidId}`);
        }}
      >
        <img
          src={`http://localhost:3002/api/stream/1701381015927-output-256x1440.ts`}
          alt="VideoCard"
          className="aspect-w-16 aspect-h-9 object-cover max-h-[350px]"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded-md text-white text-[12px]">
          12:36
        </div>
      </div>
      <div className="ml-5">
        <div className="text-[1.6rem] font-bold mt-2">{title}</div>
        <div className="flex items-center mt-2 ">
          <div className="flex w-full items-center gap-2">
            <img
              src={displayPic}
              alt=""
              className="rounded-full h-10 w-10 my-1"
            />
            <div className="text-[14px] font-medium whitespace-no-wrap">
              {username}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="text-[14px] font-medium">112k views</div>
          <div className="text-[14px] font-medium">·</div>
          <div className="text-[14px] font-medium">2 days ago</div>
        </div>
      </div>
    </div>
  );
};

export default VideoBlock;
