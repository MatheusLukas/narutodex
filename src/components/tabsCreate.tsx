"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormCharacter } from "./forms/formCharacter";
import { FormKekkeiGenkai } from "./forms/formKekkeiGenkai";
import { FormBijuu } from "./forms/formBijuu";
import { FormCla } from "./forms/formCla";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
    <Tabs
      defaultValue={searchParams}
      className="w-fit animate-fade-down animate-duration-700 p-2 md:p-0"
    >
      <TabsList className="grid w-full grid-cols-4">
        {tabs.map((tab) => (
          <TabsTrigger asChild key={tab.value} value={tab.value}>
            <Link href={{ query: { type: tab.value } }}>{tab.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
