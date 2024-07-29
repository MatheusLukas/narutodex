import { CharacterSchemaType } from "prisma/zod/character";
import { create } from "zustand";

type StateCharacter = {
  character: CharacterSchemaType;
  setCharacters: (characters: CharacterSchemaType) => void;
};

export const useCharacter = create<StateCharacter>((set) => ({
  character: {} as CharacterSchemaType,
  setCharacters: (character) => set({ character }),
}));
