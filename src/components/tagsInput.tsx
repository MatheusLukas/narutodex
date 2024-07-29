"use client";
import { TagsInput } from "@ark-ui/react";
import type { ControllerRenderProps } from "react-hook-form";
import { Inputs } from "./forms/formCharacter";
import { InputsBijuu } from "./forms/formBijuu";

type Props = {
  field:
    | ControllerRenderProps<Inputs, "kekkeiGenkai">
    | ControllerRenderProps<InputsBijuu, "jinchuurikis">;
  text: string;
};

export function InputTags({ field, text }: Props) {
  const removeItem = (index: number) => {
    const newValue = field.value.filter((_, i) => i !== index);
    field.onChange(newValue);
  };

  return (
    <TagsInput.Root
      value={field.value}
      onValueChange={({ value }) => field.onChange(value)}
      className="flex flex-col gap-2 w-full"
    >
      {(api) => (
        <>
          <TagsInput.Label>{text}</TagsInput.Label>
          <TagsInput.Control className="border bg-background flex flex-row flex-wrap gap-2 px-4 py-2">
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
              placeholder="Add tag"
            />
          </TagsInput.Control>

          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </>
      )}
    </TagsInput.Root>
  );
}
