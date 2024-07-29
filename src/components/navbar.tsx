import { MotionHeader } from "@/lib/framer";
import Image from "next/image";
import { Icons } from "./icon";
import { ButtonStyles } from "./ui/button";
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
          <Link
            className={ButtonStyles({
              variant: "ghost",
            })}
            href={{ pathname: "/create", query: { type: "character" } }}
          >
            Create
          </Link>
          <Link
            href={"/"}
            target="_blank"
            rel="noreferrer"
            className={ButtonStyles({
              variant: "ghost",
              size: "icon",
            })}
          >
            <Icons.GitHub className="text-white h-[1.2rem] w-[1.2rem]" />
          </Link>
        </div>
      </div>
    </MotionHeader>
  );
}
