import { Send } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { getComment, postComment } from "../../Services/mainService";

interface Comment {
  vidId: string;
  actualComment: string;
  displayPic: string;
  username: string;
  __v: number;
  _id: string;
}
interface CommentSectionProps {
  vidId: string;
}

const CommentSection = (props: CommentSectionProps) => {
  const { vidId } = props;
  console.log("vidId:: ", vidId);

  const [myComment, setComment] = useState<string>("");
  const [allComments, setAllComments] = useState<Comment[]>([]);

  useEffect(() => {
    getComment(vidId).then((com) => {
      setAllComments(com.comments);
    });
  }, [vidId]);

  const handleSubmit = () => {
    console.log("myComment: ", myComment);
    postComment(vidId, myComment).then((res) => {
      console.log("res Comment: ", res);
      console.log("All Commnet: ", allComments);
      setComment("");
    });
  };

  return (
    <div className="comments-section min-h-[50vh]">
      This is the comment section.
      <div className={`my-5 flex shadow-lg py-2 rounded-2xl dark:bg-gray-700`}>
        <input
          type="text"
          className={`p-2 ml-2 bg-transparent border-black w-full outline-none dark:text-white`}
          placeholder="Add a myComment!"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setComment(e.target.value)
          }
          value={myComment}
        />
        <button
          onClick={handleSubmit}
          className={`flex items-center gap-2 mx-2 border-blue-300 border-[1px] p-2 bg-blue-400 rounded-2xl dark:bg-blue-600 dark:border-blue-600`}
        >
          <Send /> Comment
        </button>
      </div>
      <div className="mb-12">
        {allComments.map((singleComment) => (
          <div key={singleComment._id} className="flex items-center gap-5 my-5">
            <img
              className="object-cover h-15 w-15 rounded-full p-1 border-y-2"
              src={`${
                import.meta.env.VITE_API_MAIN_SERVER
              }/getFile/ChannelImages/${singleComment.displayPic}`}
              alt=""
              width={55}
            />
            <div className="flex-col">
              <div className="font-semibold text-xl py-2">
                {singleComment.username}
              </div>
              <div className="">{singleComment.actualComment}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
