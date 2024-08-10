import { PrismaClient } from "@prisma/client";
import { characterSchema } from "prisma/zod/character";
import { z } from "zod";
const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const { id, name, image, natureType, type, bijuu, clan, kekkeiGenkai } =
      characterSchema.parse(body);
    if (!type.includes("CHARACTER")) {
      type.push("CHARACTER");
    }

    if (id) {
      await prisma.character.update({
        where: { id },
        data: {
          name,
          image,
          natureType,
          type,
          bijuu,
          clan,
          kekkeiGenkai,
        },
      });
    } else {
      await prisma.character.create({
        data: {
          name,
          image,
          natureType,
          type,
          bijuu,
          clan,
          kekkeiGenkai,
        },
      });
    }

    return new Response(null, { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response(e.message, { status: 400 });
    } else if (e instanceof Error) {
      return new Response(e.message, { status: 500 });
    }
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    if(id) {
      const character = await prisma.character.findUnique({
        where: { id },
      });
      if (!character) {
        return new Response("Character not found", { status: 404 });
      }
      return new Response(JSON.stringify(character), { status: 200 });
    }else {
      const {
    type: [type],
  } = characterSchema
    .pick({ type: true })
    .parse({ type: [searchParams.get("type")] });
    const characters = await prisma.character.findMany({
      where: { type: { has: type } },
    });
    return new Response(JSON.stringify(characters), { status: 200 });
    }
  }catch (e) {
    if (e instanceof z.ZodError) {
      return new Response(e.message, { status: 400 });
    } else if (e instanceof Error) {
      return new Response(e.message, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  const body = await req.json();
  try {
    const { id } = z.object({ id: z.string().uuid() }).parse(body);

    await prisma.character.delete({
      where: { id },
    });
    return new Response(null, { status: 204 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response(e.message, { status: 400 });
    } else if (e instanceof Error) {
      return new Response(e.message, { status: 500 });
    }
  }
}
