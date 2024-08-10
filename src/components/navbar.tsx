import { MotionHeader } from "@/lib/framer";
import Image from "next/image";
import { Icons } from "./icon";
import { Button, ButtonStyles } from "./ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <MotionHeader
      initial={{ opacity: 0, y: -50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.2 },
      }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="flex items-center justify-between container py-2">
        <Link href={"/"}>
          <Image
            src="/naruto-logo.png"
            alt="logo"
            width={100}
            height={100}
            className="w-20"
          />
        </Link>
        <div className="flex flex-row items-center justify-center gap-2">
          <Button variant="ghost">
          <Link
            href={{ pathname: "/create", query: { type: "character" } }}
          >
            Create
          </Link>
          </Button>
          <Button variant="ghost" size="icon">
          <Link
            href={"/"}
            target="_blank"
            rel="noreferrer"
          >
            <Icons.GitHub className="text-white h-[1.2rem] w-[1.2rem]" />
          </Link>
          </Button>
        </div>
      </div>
    </MotionHeader>
  );
}
