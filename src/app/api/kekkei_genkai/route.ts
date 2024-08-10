import { PrismaClient } from "@prisma/client";
import { kekkeiGenkaiSchema } from "prisma/zod/kekkei-genkai";
import { z } from "zod";
const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const { id, name, image, description, type } =
      kekkeiGenkaiSchema.parse(body);
    if (!type.includes("KEKKEI_GENKAI")) {
      type.push("KEKKEI_GENKAI");
    }
    if (id) {
      await prisma.kekkei_genkai.update({
        where: { id },
        data: {
          name,
          image,
          description,
          type,
        },
      });
    } else {
      await prisma.kekkei_genkai.create({
        data: {
          name,
          image,
          description,
          type,
        },
      });
    }
    return new Response(null, {
      status: 201,
    });
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
    if (id) {
      const kekkei_genkai = await prisma.kekkei_genkai.findUnique({
        where: { id },
      });
      if (!kekkei_genkai) {
        return new Response("Kekkei genkai not found", { status: 404 });
      }
      return new Response(JSON.stringify(kekkei_genkai), { status: 200 });
    }
  const {
    type: [type],
  } = kekkeiGenkaiSchema
    .pick({ type: true })
    .parse({ type: [searchParams.get("type")] });
 
    const kekkei_genkais = await prisma.kekkei_genkai.findMany({
      where: { type: { has: type } },
    });
    return new Response(JSON.stringify(kekkei_genkais), { status: 200 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response(e.message, { status: 400 });
    } else if (e instanceof Error) {
      return new Response(e.message, { status: 500 });
    }
  }
}

// export async function PUT(req: Request) {
//   const body = await req.json();
//   console.log(body, "PUT");
//   try {
//     const { id, name, image, description } = kekkeiGenkaiSchema.parse(body);

//     await prisma.kekkei_genkai.update({
//       where: { id },
//       data: {
//         name,
//         image,
//         description,
//       },
//     });

//     return new Response(null, { status: 204 });
//   } catch (e) {
//     if (e instanceof z.ZodError) {
//       return new Response(e.message, { status: 400 });
//     } else if (e instanceof Error) {
//       return new Response(e.message, { status: 500 });
//     }
//   }
// }

export async function DELETE(req: Request) {
  const body = await req.json();
  try {
    const { id } = z.object({ id: z.string().uuid() }).parse(body);

    await prisma.kekkei_genkai.delete({
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
