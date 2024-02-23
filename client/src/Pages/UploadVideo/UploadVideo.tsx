import { ChangeEvent, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { uploadVideo } from "../../Services/uploaderService";

const UploadVideo = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [uploadedVideo, setUploadedVideo] = useState<File>();
  const [uploadedThumbnail, setUploadedThumbnail] = useState<File>();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setTitle(text);
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setDescription(text);
  };
  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.files: ", e.target.files);

    const file = e.target.files?.[0];
    if (file) setUploadedVideo(file);
  };
  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("file: ", file);

    if (file) setUploadedThumbnail(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (uploadedVideo) formData.append("video", uploadedVideo);
    if (uploadedThumbnail) formData.append("thumbnail", uploadedThumbnail);

    if (title) formData.append("title", title);
    if (description) formData.append("description", description);
    console.log("formData: ", formData);

    try {
      const authToken = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data: ProgressEvent) => {
          console.log(data.loaded, data.total, data.lengthComputable);
        },
      };
      // const res = await uploadVideo(formData, config);
      console.log("Sending request...");
      const res = await uploadVideo(formData, config);
      console.log("Sent request...");
      console.log("res: ", res);
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  return (
    <div className="grid place-items-center">
      <h1 className="text-[2rem] font-bold my-8"> Upload Video ! </h1>
      <Form.Root onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <div className="">
            <label
              className="block mb-1 my-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="displayPic"
            >
              Upload Video
            </label>
            <input
              id="video"
              name="video"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer p-2
          bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="file"
              // accept="video/*"
              onChange={handleVideoChange}
            />
          </div>
          <div className="">
            <label
              className="block mb-1 my-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="imageUpload"
            >
              Upload Thumbnail
            </label>
            <input
              id="thumbnail"
              name="thumbnail"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer p-2
            bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
            />
          </div>
        </div>
        <Form.Field className="grid mb-[10px]" name="username">
          <div className="flex items-baseline justify-between">
            <Form.Label
              className={`text-[15px] font-medium leading-[35px] text-black dark:text-white`}
            >
              Title
            </Form.Label>
            <Form.Message
              className="text-[13px] text-black opacity-[0.8] dark:text-white"
              match="valueMissing"
            >
              Please enter a title
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              placeholder="Enter a video title"
              className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 
              bg-gray-50 dark:text-white focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
              type="text"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-[10px]" name="username">
          <div className="flex items-baseline justify-between">
            <Form.Label
              className={`text-[15px] font-medium leading-[35px] text-black dark:text-white`}
            >
              Video Description
            </Form.Label>
          </div>
          <Form.Control asChild>
            <textarea
              className="p-3 box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[85px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 
              bg-gray-50 dark:text-white focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
              placeholder="Enter a short bio"
              rows={9}
              cols={50}
              value={description}
              onChange={handleDescriptionChange}
            />
          </Form.Control>
        </Form.Field>
        <div className="w-full grid place-items-center">
          <Form.Submit asChild>
            <button className="box-border w-1/2 text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[1.5rem] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px] text-[1rem]">
              Upload Video
            </button>
          </Form.Submit>
        </div>
      </Form.Root>
    </div>
  );
};

export default UploadVideo;
