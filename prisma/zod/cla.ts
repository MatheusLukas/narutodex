import { Type } from "@prisma/client";
import { z } from "zod";

export const clanSchema = z.object({
  id: z.string().uuid().nullish(),
  name: z
    .string()
    .min(1, "Name length must be greater than 1")
    .max(20, "Name length must be less than 20"),
  image: z.string().url(),
  village: z
    .string()
    .max(20, "Village Name length must be less than 20")
    .optional(),
  type: z.array(z.nativeEnum(Type)),
});

export type ClanSchemaType = z.infer<typeof clanSchema>;
