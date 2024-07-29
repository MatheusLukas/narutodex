import ky from "ky";
import { BijuuSchemaType } from "prisma/zod/bijuu";
import { CharacterSchemaType } from "prisma/zod/character";
import { ClanSchemaType } from "prisma/zod/cla";
import { kekkeiGenkaiSchemaType } from "prisma/zod/kekkei-genkai";

export const postQuery = async ({
  data,
  search,
}: {
  data:
    | CharacterSchemaType
    | BijuuSchemaType
    | ClanSchemaType
    | kekkeiGenkaiSchemaType;
  search: string;
}) => {
  await ky.post(`/api/${search}`, { json: data });
};
