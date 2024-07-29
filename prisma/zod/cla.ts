import { Type } from "@prisma/client";
import { z } from "zod";

export const clanSchema = z.object({
  id: z.string().uuid().nullish(),
  name: z.string(),
  image: z.string().url(),
  village: z.string().optional(),
  type: z.array(z.nativeEnum(Type)),
});

export type ClanSchemaType = z.infer<typeof clanSchema>;
