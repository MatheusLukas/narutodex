import ky from "ky";

const SPECIAL_TYPES = ["clan", "kekkei_genkai", "bijuu"] as const;
type SpecialType = typeof SPECIAL_TYPES[number];

export const getCharacters = async (type: string, id?: string) => {
  const endpoint = SPECIAL_TYPES.includes(type as SpecialType) ? type : "character";
  const searchParams = { type: type.toUpperCase(), id: id || "" };

  const data = await ky.get(`/api/${endpoint}`, { searchParams }).json();
  return data;
};