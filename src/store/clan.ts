import { ClanSchemaType } from "prisma/zod/cla";
import { create } from "zustand";

type StateClan = {
  clan: ClanSchemaType;
  setClan: (clan: ClanSchemaType) => void;
};

export const useClan = create<StateClan>((set) => ({
  clan: {} as ClanSchemaType,
  setClan: (clan) => set({ clan }),
}));
