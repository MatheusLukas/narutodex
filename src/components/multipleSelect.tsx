"use client";
import { ControllerRenderProps } from "react-hook-form";
import { Inputs } from "./forms/formCharacter";
import { Select } from "./ui/select";

type MultipleProps = {
  field:
    | ControllerRenderProps<Inputs, "type">
    | ControllerRenderProps<Inputs, "bijuu">
    | ControllerRenderProps<Inputs, "natureType">;
  type: "Character" | "Nature" | "Bijuu";
};

const items = {
  Character: [
    { label: "Hokage", value: "HOKAGE" },
    { label: "Kazekage", value: "KAZEKAGE" },
    { label: "Raikage", value: "RAIKAGE" },
    { label: "Tsuchikage", value: "TSUCHIKAGE" },
    { label: "Mizukage", value: "MIZUKAGE" },
    { label: "Akatsuki", value: "AKATSUKI" },
    { label: "Jinchuuriki", value: "JINCHUURIKI" },
  ],
  Bijuu: [
    { label: "Shukaku", value: "SHUKAKU" },
    { label: "Matatabi", value: "MATATABI" },
    { label: "Isobu", value: "ISOBU" },
    { label: "Son Goku", value: "SON_GOKU" },
    { label: "Kokuo", value: "KOKUO" },
    { label: "Saiken", value: "SAIKEN" },
    { label: "Chomei", value: "CHOMEI" },
    { label: "Gyuki", value: "GYUKI" },
    { label: "Kurama", value: "KURAMA" },
    { label: "Juubi", value: "JUUBI" },
  ],
  Nature: [
    { label: "Wind", value: "WIND" },
    { label: "Fire", value: "FIRE" },
    { label: "Water", value: "WATER" },
    { label: "Earth", value: "EARTH" },
    { label: "Lightning", value: "LIGHTNING" },
  ],
};
export const Multiple = ({ field, type }: MultipleProps) => {
  return (
    <Select
      items={items[type]}
      value={field.value}
      onValueChange={({ value }) => field.onChange(value)}
      multiple
      positioning={{ sameWidth: true }}
    >
      <Select.Label>{type}</Select.Label>
      <Select.Control>
        <Select.Trigger placeholder={"Select the value"} />
      </Select.Control>
      <Select.Content>
        {items[type].map((item) => (
          <Select.Item key={item.value} item={item.value}>
            {item.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
};
