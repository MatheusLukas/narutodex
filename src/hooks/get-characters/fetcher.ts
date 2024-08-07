import ky from "ky";

export const getCharacters = async (type: string) => {
  const data = await ky
    .get(`/api/${type !== "clan" && type !== "kekkei_genkai" && type !== "bijuu" ? "character" : type}`, {
      searchParams: { type: type?.toUpperCase() || "" },
    })
    .json();

  return data;
};
