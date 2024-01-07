import { create } from "zustand";

interface HireMeStore {
  showHireMe: boolean;
  toggleHireMe: () => void;
  isSent: boolean;
  setIsSent: (isSent: boolean) => void;
}

export const hireMeStore = create<HireMeStore>((set, get) => ({
  showHireMe: false,
  toggleHireMe: () => set({ showHireMe: !get().showHireMe }),
  isSent: false,
  setIsSent: (isSent) => set({ isSent }),
}));
