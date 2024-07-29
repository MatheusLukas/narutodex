import { utapi } from "@/app/api/uploadthing/core";
import ky from "ky";

export const deleteQuery = async ({
  characterId,
  search,
}: {
  characterId: string;
  search: string;
}) => {
  await ky.delete(`/api/${search}`, {
    json: { id: characterId },
  });
};
