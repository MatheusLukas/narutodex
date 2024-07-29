import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter, utapi } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});

//

export async function DELETE(req: Request) {
  const body = await req.json();
  console.log(body);

  const { key } = body;

  try {
    await utapi.deleteFiles(key);
    return new Response(null, { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(null, { status: 500 });
  }
}
