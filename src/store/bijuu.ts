import { create } from "zustand";
import { BijuuSchemaType } from "prisma/zod/bijuu";

type StateBijuu = {
  bijuu: BijuuSchemaType;
  setBijuu: (bijuu: BijuuSchemaType) => void;
};

export const useBijuu = create<StateBijuu>((set) => ({
  bijuu: {} as BijuuSchemaType,
  setBijuu: (bijuu) => set({ bijuu }),
}));
