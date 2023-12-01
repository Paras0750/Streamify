import axios, { AxiosInstance } from "axios";
import "../types";
import { uploadConfig } from "../types";

const BASE_URL = "https://localhost:3003/api";

const uploaderApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadVideo = async (videoData: FormData, config: uploadConfig) => {
  console.log("Here");
  const response = await uploaderApi.post("/upload", videoData, config);
  console.log("Here2");
  
  return response.data;
};

export const getFiles = async () => {
  const response = await uploaderApi.get("/files");
  return response.data;
};

export default uploaderApi;
