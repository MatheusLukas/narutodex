import { Type } from "@prisma/client";
import { z } from "zod";

export const kekkeiGenkaiSchema = z.object({
  id: z.string().uuid().nullish(),
  name: z
    .string()
    .min(1, "Name length must be greater than 1")
    .max(20, "Name length must be greater than 20"),
  description: z
    .string()
    .max(20, "Description length must be greater than 20")
    .optional(),
  image: z.string().url(),
  type: z.array(z.nativeEnum(Type)),
});

export type kekkeiGenkaiSchemaType = z.infer<typeof kekkeiGenkaiSchema>;
