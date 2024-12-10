import { BijuuType, Type } from "@prisma/client";
import { z } from "zod";

export const bijuuSchema = z.object({
  id: z.string().uuid().nullish(),
  name: z.nativeEnum(BijuuType),
  image: z.string().url(),
  history: z
    .string()
    .max(500, "History length must be less than 500")
    .optional(),
  jinchuurikis: z.array(z.string()).optional(),
  type: z.array(z.nativeEnum(Type)),
});

export type BijuuSchemaType = z.infer<typeof bijuuSchema>;
