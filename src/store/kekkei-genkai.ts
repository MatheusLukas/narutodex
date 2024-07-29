import { kekkeiGenkaiSchemaType } from "prisma/zod/kekkei-genkai";
import { create } from "zustand";

type StateKekkeiGenkai = {
  kekkeiGenkai: kekkeiGenkaiSchemaType;
  setKekkeiGenkai: (kekkeiGenkai: kekkeiGenkaiSchemaType) => void;
};

export const useKekkeiGenkai = create<StateKekkeiGenkai>((set) => ({
  kekkeiGenkai: {} as kekkeiGenkaiSchemaType,
  setKekkeiGenkai: (kekkeiGenkai) => set({ kekkeiGenkai }),
}));
