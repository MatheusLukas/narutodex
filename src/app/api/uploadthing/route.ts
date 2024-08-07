import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter, utapi } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});

//

export async function DELETE(req: Request) {
  const body = await req.json();


  const { key } = body;
  let imageKey = key;

  if (imageKey.startsWith("https://utfs.io/f/")) {
    imageKey = key.replace("https://utfs.io/f/", "");
  }
  try {
    await utapi.deleteFiles(imageKey);
    return new Response(null, { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(null, { status: 500 });
  }
}
