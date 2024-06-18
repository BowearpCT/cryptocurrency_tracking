import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface AuthState {
  user: any;
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
            set({ user: response.data, status: "idle" });
          } catch (error) {
            set({ status: "error" });
          }
        },
        login: async (credentials) => {
          set({ status: "loading" });
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
              credentials
            );
            set({ token: response.data.access_token, status: "idle" });
          } catch (error) {
            set({ status: "error" });
          }
        },
        logout: () => {
          set({ user: null, token: null });
        },
      }),
      {
        name: "useAuthStore",
      }
    )
  )
);

export default useAuthStore;
