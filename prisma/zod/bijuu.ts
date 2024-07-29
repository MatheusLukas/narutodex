import { BijuuType, Type } from "@prisma/client";
import { z } from "zod";

export const bijuuSchema = z.object({
  id: z.string().uuid().nullish(),
  name: z.nativeEnum(BijuuType),
  image: z.string().url(),
  history: z.string().optional(),
  jinchuurikis: z.array(z.string()).optional(),
  type: z.array(z.nativeEnum(Type)),
});

export type BijuuSchemaType = z.infer<typeof bijuuSchema>;
