import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface useSelectDataProps {
  selectData: string;
  setSelectData: (value: string) => void;
}
export const useSelectData = create<useSelectDataProps>()(
  persist(
    (set) => ({
      selectData: "Frontend",
      setSelectData: (value: string) => set(() => ({ selectData: value })),
    }),
    {
      name: "selectCategory",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
