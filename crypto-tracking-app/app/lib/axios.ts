import axios from "axios";
import useAuthStore from "../stores/auth.store";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

axiosInstance.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
