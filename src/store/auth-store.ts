import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  token: string;
};

type Actions = {
  setToken: (token: string) => void;
  clearToken: () => void;
};

export const useAuthStore = create<AuthStore & Actions>()(
  persist(
    (set) => ({
      token: "",
      setToken: (token) => set((state) => ({ token })),
      clearToken: () =>
        set((state) => ({
          token: undefined,
        })),
    }),
    { name: "global" },
  ),
);
