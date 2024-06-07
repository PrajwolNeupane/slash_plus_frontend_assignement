import axios, { AxiosInstance } from "axios";

interface Config {
  baseURL: string;
  headers?: Record<string, string>;
  withCredentials?: boolean;
}

let instance: AxiosInstance;

const config: Config = {
  baseURL: `${import.meta.env.VITE_REACT_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
  },
  withCredentials: true,
};

instance = axios.create(config);

export default instance;
