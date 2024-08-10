import { PrismaClient } from "@prisma/client";
import { bijuuSchema } from "prisma/zod/bijuu";
import { z } from "zod";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body, "aqui");

  try {
    const { id, name, image, history, jinchuurikis, type } =
      bijuuSchema.parse(body);
    if (!type.includes("BIJUU")) {
      type.push("BIJUU");
    }
    if (id) {
      await prisma.bijuu.update({
        where: { id },
        data: {
          name,
          image,
          history,
          type,
          jinchuurikis,
        },
      });
    } else {
      await prisma.bijuu.create({
        data: {
          name,
          image,
          history,
          type,
          jinchuurikis,
        },
      });
    }
    return new Response(null, {
      status: 201,
    });
  } catch (e) {
    console.log(e);
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
    if (id) {
      const bijuu = await prisma.bijuu.findUnique({
        where: { id },
      });
      if (!bijuu) {
        return new Response("Bijuu not found", { status: 404 });
      }
      return new Response(JSON.stringify(bijuu), { status: 200 });
    } else {
      const {
        type: [type],
      } = bijuuSchema
        .pick({ type: true })
        .parse({ type: [searchParams.get("type")] });

      const bijuus = await prisma.bijuu.findMany({
        where: { type: { has: type } },
      });
      return new Response(JSON.stringify(bijuus), { status: 200 });
    }
  } catch (e) {
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

    await prisma.bijuu.delete({
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
