import z from "zod";
import { BijuuType, NatureType, Type } from "@prisma/client";

export const characterSchema = z.object({
  id: z.string().uuid().nullish(),
  name: z
    .string()
    .min(1, "Name length must be greater than 1")
    .max(15, "Name length must be less than 15"),
  image: z.string().url(),
  natureType: z.array(z.nativeEnum(NatureType)),
  type: z.array(z.nativeEnum(Type)),
  clan: z.string().max(15, "Clan length must be less than 15").optional(),
  kekkeiGenkai: z
    .array(z.string().max(20, "Kekkei genkai length must be less than 20"))
    .optional(),
  bijuu: z.array(z.nativeEnum(BijuuType)),
});

export type CharacterSchemaType = z.infer<typeof characterSchema>;
