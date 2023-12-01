import axios, { AxiosInstance } from "axios";
import { uploadConfig } from "../types";

const BASE_URL = "http://localhost:3001/api/app";

const mainApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json, multipart/form-data",
  },
});

export const getVideo = async (videoId: string) => {
  const response = await mainApi.post(`/getvideo`, { videoId });
  return response.data;
};

export const getChannel = async (username: string, config: uploadConfig) => {
  const response = await mainApi.post(
    "/getChannel",
    JSON.stringify({ username }),
    config
  );
  return response;
};

export const getFeed = async () => {
  const response = await mainApi.get("/getpublicfeed");
  console.log(response.data.feed);
  return response.data.feed;
};

export const createChannel = async (
  channelDet: FormData,
  config: uploadConfig
) => {
  const response = await mainApi.post("/createchannel", channelDet, config);

  return response.data;
};

export default mainApi;
