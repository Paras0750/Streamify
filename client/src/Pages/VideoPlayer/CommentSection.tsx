import { Send } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { getComment, postComment } from "../../Services/main/main";

interface Comment {
  actualComment: string;
  displayPic: string;
  username: string;
  vidId: string;
  __v: number;
  _id: string;
}
const CommentSection = (props: Comment) => {
  const { vidId } = props;
  console.log("vidId:: ", vidId);

  const [comment, setComment] = useState<string>("");
  const [allComments, setAllComments] = useState<Comment[]>([]);

  useEffect(() => {
    getComment(vidId).then((com) => {
      setAllComments(com.comments);
    });
  }, []);

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    console.log("comment: ", comment);
    console.log("vidId: ", vidId);
    postComment(vidId, comment).then((res) => {
      console.log("res Comment: ", res);
      console.log("All Commnet: ", allComments);
      allComments.push(comment);
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
          placeholder="Add a comment!"
          onChange={handleCommentChange}
          value={comment}
        />
        <button
          onClick={handleSubmit}
          className={`flex items-center gap-2 mx-2 border-blue-300 border-[1px] p-2 bg-blue-400 rounded-2xl dark:bg-blue-600 dark:border-blue-600`}
        >
          <Send /> Comment
        </button>
      </div>
      <div className="">
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
