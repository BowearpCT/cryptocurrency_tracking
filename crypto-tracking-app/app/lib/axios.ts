import axios from "axios";
import useAuthStore from "../stores/auth.store";
import Router from "next/router";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

axiosInstance.interceptors.request.use((config) => {
  const { token, logout } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { logout } = useAuthStore.getState();
    if (error.response && error.response.status === 401) {
      logout();
      Router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
