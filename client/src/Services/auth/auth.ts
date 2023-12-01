// services/api/auth.ts
import axios, { AxiosInstance } from "axios";

const BASE_URL = "http://localhost:3000/api/auth";

const authApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await authApi.post("/login", credentials);

  return response.data;
};

export const register = async (credentials: {
  userName: string;
  email: string;
  password: string;
}) => {
  const response = await authApi.post("/register", credentials);
  return response.data;
};

export const logout = async () => {
  const response = await authApi.post("/logout");
  return response.data;
};

export default authApi;
