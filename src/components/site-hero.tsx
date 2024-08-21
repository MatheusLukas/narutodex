import { MotionDiv } from "@/lib/framer";
import Image from "next/image";
import WordRotate from "./magicui/word-rotate";

export function SiteHero() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: -50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.4 },
      }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.5 }}
      className="text-center py-20 container space-y-4 relative"
    >
      <h1 className="text-balance text-3xl font-extrabold tracking-tight motion-safe:animate-fade-up sm:text-5xl md:text-6xl lg:text-7xl">
        An app created to get information about{" "}
        <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
          Naruto
        </span>{" "}
        using Next.js and Tailwind CSS
      </h1>
      <div className="-space-y-3">
      <h2 className="mx-auto text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8 flex items-center justify-center gap-2">
        Find out about their <WordRotate className="text-balance leading-normal text-foreground/60 sm:text-xl sm:leading-8 w-[100px] text-start" words={[" characters","families","clans "]} />
      </h2>
      <h2 className="mx-auto max-w-[42rem] text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        and more about the narutoverse
      </h2>
      </div>
      <Image
        src="/kunai.png"
        alt="Naruto"
        width={80}
        height={80}
        className="rotate-90 absolute top-32 right-48 hidden md:block lg:right-56 md:right-16 md:top-32"
      />
      <Image
        src="/shuriken.png"
        alt="Naruto"
        width={80}
        height={80}
        className="rotate-90 absolute top-14 left-72 hidden md:block xl:left-72 lg:left-48 md:left-12 md:top-10"
      />
    </MotionDiv>
  );
}
