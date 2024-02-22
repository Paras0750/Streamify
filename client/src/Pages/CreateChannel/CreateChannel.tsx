import { ChangeEvent, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { createChannel } from "../../Services/mainService";
import { useNavigate } from "react-router-dom";

export interface ChannelDetails {
  userName: string;
  displayPic: string;
  banner: string;
  bio: string;
}

const CreateChannel = () => {
  const [userName, setuserName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [bannerImage, setBannerImage] = useState<Blob>();
  const [displayPic, setDisplayPic] = useState<Blob>();
  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setuserName(text);
  };
  const handleBioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const bio = e.target.value;
    setBio(bio);
  };
  const handleBannerImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setBannerImage(file);
  };
  const handleDisplayPicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setDisplayPic(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (bannerImage) formData.append("bannerImage", bannerImage);
    if (displayPic) formData.append("displayPic", displayPic);

    formData.append("userName", userName);
    formData.append("bio", bio);

    try {
      const authToken = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await createChannel(formData, config);
      console.log("res: ", res);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  return (
    <div className="grid grid-cols-8 px-5 h-full min-h-[80vh] max-w-full">
      <div className="col-span-4 mx-auto my-auto p-5 py-10">
        <h1 className="text-[2rem] font-bold mb-10 dark:text-white">
          Create Channel
        </h1>
        <Form.Root onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="col-span-5 flex gap-5">
            <div className="">
              <label
                className="block mb-1 my-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="imageUpload"
              >
                Upload Banner
              </label>
              <input
                id="imageUpload"
                name="bannerImage"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer p-2
            bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                type="file"
                accept="image/*"
                onChange={handleBannerImageChange}
              />
            </div>
            <div className="">
              <label
                className="block mb-1 my-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="displayPic"
              >
                Upload Display Pic
              </label>
              <input
                id="displayPic"
                name="displayPic"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer p-2
          bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                type="file"
                accept="image/*"
                onChange={handleDisplayPicChange}
              />
            </div>
          </div>
          <Form.Field className="grid mb-[10px]" name="username">
            <div className="flex items-baseline justify-between">
              <Form.Label
                className={`text-[15px] font-medium leading-[35px] text-black dark:text-white`}
              >
                Username
              </Form.Label>
              <Form.Message
                className="text-[13px] text-black opacity-[0.8] dark:text-white"
                match="valueMissing"
              >
                Please provide a valid Username
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                placeholder="Enter a unique username"
                className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 
              bg-gray-50 dark:text-white focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
                type="text"
                value={userName}
                onChange={handleUsernameChange}
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="grid mb-[10px]" name="username">
            <div className="flex items-baseline justify-between">
              <Form.Label
                className={`text-[15px] font-medium leading-[35px] text-black dark:text-white`}
              >
                Bio
              </Form.Label>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 
              bg-gray-50 dark:text-white focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
                type="text"
                placeholder="Enter a short bio"
                value={bio}
                onChange={handleBioChange}
                required
              />
            </Form.Control>
          </Form.Field>
          <div className="w-full grid place-items-center">
            <Form.Submit asChild>
              <button className="box-border w-2/6 text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[1.5rem] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px] text-[1rem]">
                Create Channel
              </button>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>
      {(bannerImage || displayPic) && (
        <div className="pt-[8rem] px-2 col-span-4">
          <h1 className="text-[1.5rem] font-bold mb-10 dark:text-white">
            Preview:
          </h1>

          <div className="relative">
            {bannerImage && (
              <div className="aspect-video w-[70vh]">
                <img
                  src={URL.createObjectURL(bannerImage)}
                  alt="Preview"
                  className="h-full w-full rounded-md shadow-slate-600"
                />
              </div>
            )}
            {displayPic && (
              <img
                width={150}
                height={150}
                className="object-cover absolute -bottom-16 left-10 rounded-full border-2 border-white shadow-slate-600"
                src={URL.createObjectURL(displayPic)}
              />
            )}
          </div>
          <div
            onClick={handleSubmit}
            className="ml-[14rem] mt-[1rem] text-black w-full "
          >
            <div className="text-[2rem] font-bold w-full dark:text-white">
              {userName}
            </div>
            <div className="mt-2 ml-4 dark:text-white">{bio}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateChannel;
