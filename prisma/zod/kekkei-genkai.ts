import { Type } from "@prisma/client";
import { z } from "zod";

export const kekkeiGenkaiSchema = z.object({
  id: z.string().uuid().nullish(),
  name: z.string(),
  description: z.string().optional(),
  image: z.string().url(),
  type: z.array(z.nativeEnum(Type)),
});

export type kekkeiGenkaiSchemaType = z.infer<typeof kekkeiGenkaiSchema>;
