"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="absolute inset-0 m-auto animate-bounce text-muted-foreground p-4 h-fit flex items-center justify-center">
      <div role="status">
        <Image src="/naruto-logo.png" alt="Naruto" width={100} height={100} />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
