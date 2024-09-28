"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormCharacter } from "./forms/formCharacter";
import { FormKekkeiGenkai } from "./forms/formKekkeiGenkai";
import { FormBijuu } from "./forms/formBijuu";
import { FormCla } from "./forms/formCla";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MotionDiv } from "@/lib/framer";

const tabs = [
  {
    value: "character",
    label: "Character",
    content: <FormCharacter />,
  },
  {
    value: "kekkei_genkai",
    label: "Kekkei Genkai",
    content: <FormKekkeiGenkai />,
  },
  {
    value: "bijuu",
    label: "Bijuu",
    content: <FormBijuu />,
  },
  {
    value: "clan",
    label: "Clan",
    content: <FormCla />,
  },
];

export function TabsCreate() {
  const searchParams = useSearchParams().get("type") || "character";
  return (
    <Tabs defaultValue={searchParams} className="w-fit p-2 md:p-0">
      <MotionDiv
        initial={{ opacity: 0, y: 50 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.5 },
        }}
        viewport={{ once: true, margin: "-64px" }}
      >
        <TabsList className="grid w-full grid-cols-4">
          {tabs.map((tab) => (
            <TabsTrigger asChild key={tab.value} value={tab.value}>
              <Link href={{ query: { type: tab.value } }}>{tab.label}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </MotionDiv>
      <MotionDiv
        initial={{ opacity: 0, y: 50 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.7 },
        }}
        viewport={{ once: true, margin: "-64px" }}
      >
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </MotionDiv>
    </Tabs>
  );
}
