import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  user: any | null;
};

type Actions = {
  setUser: (user: any | null) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthStore & Actions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set((state) => ({ user })),
      clearUser: () =>
        set((state) => ({
          user: null,
        })),
    }),
    { name: "auth-store" },
  ),
);
