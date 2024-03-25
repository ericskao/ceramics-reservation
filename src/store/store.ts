import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import type {} from "@redux-devtools/extension"; // required for devtools typing

interface StoreState {
  hourPickerOpen: boolean;
  setHourPickerOpen: (open: boolean) => void;
  // bears: number;
  // increase: (by: number) => void;
}

export const useEventStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        hourPickerOpen: false,
        setHourPickerOpen: (open: boolean) =>
          set(() => ({
            hourPickerOpen: open,
          })),
        // bears: 0,
        // increase: (by) => set((state) => ({ bears: state.bears + by })),
      }),
      {
        name: "event-storage",
      },
    ),
  ),
);
