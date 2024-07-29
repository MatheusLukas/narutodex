import ky from "ky";

export const getCharacters = async (type: string) => {
  const data = await ky
    .get(`/api/${type}`, { searchParams: { type: type?.toUpperCase() || "" } })
    .json();

  return data;
};
