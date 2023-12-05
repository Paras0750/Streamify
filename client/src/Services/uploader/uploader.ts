import axios, { AxiosInstance } from "axios";
import "../types";
import { uploadConfig } from "../types";

const BASE_URL = "http://localhost:3003/api";

const uploaderApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json, multipart/form-data",
  },
});

export const uploadVideo = async (
  videoData: FormData,
  config: uploadConfig
) => {
  console.log("Starting upload");
  const response = await uploaderApi.post("/upload", videoData, config);

  console.log("Upload Finished");

  return response.data;
};

export const getFiles = async () => {
  const response = await uploaderApi.get("/files");
  return response.data;
};

export default uploaderApi;
