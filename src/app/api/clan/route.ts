import { PrismaClient } from "@prisma/client";
import { clanSchema } from "prisma/zod/cla";
import { z } from "zod";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { id, name, image, village, type } = clanSchema.parse(body);
    if (!type.includes("CLAN")) {
      type.push("CLAN");
    }
    if (id) {
      await prisma.clan.update({
        where: { id },
        data: {
          name,
          image,
          village,
          type,
        },
      });
    } else {
      await prisma.clan.create({
        data: {
          name,
          image,
          village,
          type,
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
  try{
    if (id) {
      const clan = await prisma.clan.findUnique({
        where: { id },
      });
      if (!clan) {
        return new Response("Clan not found", { status: 404 });
      }
      return new Response(JSON.stringify(clan), { status: 200 });
    }
    const {
    type: [type],
  } = clanSchema
    .pick({ type: true })
    .parse({ type: [searchParams.get("type")] });

    const clans = await prisma.clan.findMany({
      where: { type: { has: type } },
    });

    return new Response(JSON.stringify(clans), { status: 200 });
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

    await prisma.clan.delete({ where: { id } });

    return new Response(null, { status: 204 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response(e.message, { status: 400 });
    } else if (e instanceof Error) {
      return new Response(e.message, { status: 500 });
    }
  }
}
