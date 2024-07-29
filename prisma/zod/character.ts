import z from "zod";
import { BijuuType, NatureType, Type } from "@prisma/client";

export const characterSchema = z.object({
  id: z.string().uuid().nullish(),
  name: z.string(),
  image: z.string().url(),
  natureType: z.array(z.nativeEnum(NatureType)),
  type: z.array(z.nativeEnum(Type)),
  clan: z.string().optional(),
  kekkeiGenkai: z.array(z.string()).optional(),
  bijuu: z.array(z.nativeEnum(BijuuType)),
});

export type CharacterSchemaType = z.infer<typeof characterSchema>;
