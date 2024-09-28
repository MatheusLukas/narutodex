import { cardsInfos } from "@/constants/cards";
import { Card } from "./card";
import { MotionDiv } from "@/lib/framer";
import Link from "next/link";
import { BorderBeam } from "./magicui/border-beam";

export function AboutNaruto() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.9 },
      }}
      viewport={{ once: true, margin: "-64px" }}
      className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-16 mb-20"
    >
      {cardsInfos.map((info) => (
        <Link
          href={{ pathname: "/category", query: { type: info.link } }}
          key={info.title}
          className="relative rounded-xl max-w-fit group overflow-hidden focus-visible:border-gray-950"
        >
          <Card key={info.title} title={info.title} image={info.image} />
          <BorderBeam
            className="hidden md:block"
            colorFrom={"#F97316"}
            colorTo={"#EF4444"}
            borderWidth={3}
          />
        </Link>
      ))}
    </MotionDiv>
  );
}
