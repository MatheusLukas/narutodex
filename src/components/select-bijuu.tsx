import { ControllerRenderProps } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select-shadcn";
import { BijuuSchemaType } from "prisma/zod/bijuu";

type Props = {
  field: ControllerRenderProps<BijuuSchemaType, "name">;
};

const bijuusName = [
  {
    label: "Shukaku",
    value: "SHUKAKU",
  },
  {
    label: "Matatabi",
    value: "MATATABI",
  },
  {
    label: "Isobu",
    value: "ISOBU",
  },
  {
    label: "Son Goku",
    value: "SON_GOKU",
  },
  {
    label: "Kokuo",
    value: "KOKUO",
  },
  {
    label: "Saiken",
    value: "SAIKEN",
  },
  {
    label: "Chomei",
    value: "CHOMEI",
  },
  {
    label: "Gyuki",
    value: "GYUKI",
  },
  {
    label: "Kurama",
    value: "KURAMA",
  },
  {
    label: "Juubi",
    value: "JUUBI",
  },
];

export function SelectBijuu({ field }: Props) {
  return (
    <Select
      value={field.value}
      onValueChange={(value) => field.onChange(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a Bijuu" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Bijuus</SelectLabel>
          {bijuusName.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
