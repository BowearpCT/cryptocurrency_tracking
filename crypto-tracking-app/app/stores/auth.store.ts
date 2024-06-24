import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios, { isAxiosError } from "axios";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface AuthState {
  user: { username: string; email: string } | null;
  token: string | null;
  status: "idle" | "loading" | "error";
  register: (userData: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        status: "idle",
        register: async (userData) => {
          set({ status: "loading" });
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
              userData
            );
            set({ user: response.data.user, status: "idle" });
          } catch (error) {
            set({ status: "error" });
            if (isAxiosError(error)) {
              throw Error(error.response?.data.message);
            }
          }
        },
        login: async (credentials) => {
          set({ status: "loading" });
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
              credentials
            );
            set({
              token: response.data.access_token,
              user: response.data.user,
              status: "idle",
            });
          } catch (error) {
            set({ status: "error" });
            if (isAxiosError(error)) {
              throw Error(error.response?.data.message);
            }
          }
        },
        logout: () => {
          set({ user: null, token: null });
          localStorage.removeItem("auth-storage"); // Clear persisted state
        },
      }),
      {
        name: "auth-storage",
        getStorage: () => localStorage,
      }
    )
  )
);

export default useAuthStore;
