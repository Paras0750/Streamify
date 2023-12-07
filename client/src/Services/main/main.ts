import axios, { AxiosInstance } from "axios";
import { uploadConfig } from "../types";

const BASE_URL = "http://localhost:3001/api/app";

const mainApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type":
      "application/json, multipart/form-data, application/x-www-form-urlencoded",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

export const postComment = async (vidId: string, actualComment: string) => {
  const data = new URLSearchParams();
  data.append("vidId", vidId);
  data.append("actualComment", actualComment);

  const response = await mainApi.post("/comment", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  return response.data;
};

export const getComment = async (vidId: string) => {
  const data = new URLSearchParams();
  data.append("vidId", vidId);

  const response = await mainApi.post(`/getcomments`, data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return response.data;
};

export const getVideo = async (vidID: string) => {
  const data = new URLSearchParams();
  data.append("vidID", vidID);

  const response = await mainApi.post(`/getvideo`, data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

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
