"use client";
import { TagsInput } from "@ark-ui/react";
import type { ControllerRenderProps } from "react-hook-form";
import { CharacterSchemaType } from "@/zodAutoGenSchemas";
import { BijuuSchemaType } from "prisma/zod/bijuu";
import { use } from "react";
import { useSearchParams } from "next/navigation";

type Props = {
  field:
    | ControllerRenderProps<CharacterSchemaType, "kekkeiGenkai">
    | ControllerRenderProps<BijuuSchemaType, "jinchuurikis">;
  text: string;
};

export function InputTags({ field, text }: Props) {
  const removeItem = (index: number) => {
    const newValue = field.value?.filter((_, i) => i !== index);
    field.onChange(newValue);
  };

  const search = useSearchParams().get("type");

  return (
    <TagsInput.Root
      value={field.value}
      onValueChange={({ value }) => field.onChange(value)}
      className="flex flex-col gap-2 w-full"
    >
      {(api) => (
        <>
          <TagsInput.Label>{text}</TagsInput.Label>
          <TagsInput.Control className="border bg-background flex flex-row flex-wrap gap-2 px-4 py-2 rounded-md">
            {api.value.map((value, index) => (
              <TagsInput.Item
                key={index}
                index={index}
                value={value}
                onClick={() => removeItem(index)}
                className="border px-2 py-1 rounded-md bg-primary-foreground text-primary-background animate-fade-up"
              >
                <TagsInput.ItemInput />
                <TagsInput.ItemText>{value}</TagsInput.ItemText>
              </TagsInput.Item>
            ))}
            <TagsInput.Input
              className="w-full bg-transparent py-4 focus-visible:outline-none"
              placeholder={
                search === "bijuu" ? "Add jinchuuriki" : "Add Kekkei Genkai"
              }
            />
          </TagsInput.Control>

          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </>
      )}
    </TagsInput.Root>
  );
}
