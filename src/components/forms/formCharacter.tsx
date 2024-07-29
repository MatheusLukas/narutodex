"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { characterSchema } from "prisma/zod/character";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Multiple } from "../multipleSelect";
import { InputTags } from "../tagsInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCharacter } from "@/store/character";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { postQuery } from "@/hooks/post";
import { DropzoneImage } from "../dropzoneImage";
import { BijuuType, NatureType, Type } from "@prisma/client";

export type Inputs = {
  id?: string;
  name: string;
  image: string;
  natureType: NatureType[];
  type: Type[];
  clan: string;
  kekkeiGenkai: string[];
  bijuu: BijuuType[];
};

export function FormCharacter() {
  console.count("FormCharacter");
  const { character } = useCharacter();
  const queryClient = useQueryClient();
  const [key, setKey] = useState<string>();

  const mutation = useMutation({
    mutationFn: postQuery,
    onSuccess: () => {
      toast.success("Character created");
      queryClient.refetchQueries({ queryKey: ["characters"] });
    },
    onError: () => toast.error("Error to create character"),
  });

  useEffect(() => {
    setValue("name", character.name);
    setValue("image", character.image);
    setValue("natureType", character.natureType ?? []);
    setValue("type", character.type ?? ["CHARACTER"]);
    setValue("clan", character.clan ?? "");
    setValue("bijuu", character.bijuu ?? []);
    setValue("kekkeiGenkai", character.kekkeiGenkai ?? []);
  }, [character]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: character.name,
      image: character.image,
      clan: character.clan,
      type: character.type,
      natureType: character.natureType,
      bijuu: character.bijuu,
      kekkeiGenkai: character.kekkeiGenkai,
    },
  });

  const onSubmit = (data: Inputs) => {
    console.log(data, "oi");
    mutation.mutate({
      data: {
        id: character.id,
        name: data.name,
        image: data.image,
        natureType: data.natureType,
        type: data.type,
        kekkeiGenkai: data.kekkeiGenkai,
        bijuu: data.bijuu,
        clan: data.clan,
      },
      search: "character",
    });
    reset();
    setValue("natureType", ["WIND"]);
    setValue("type", ["CHARACTER"]);
    setValue("clan", "");
    setValue("bijuu", []);
    setValue("kekkeiGenkai", []);
  };

  console.log(watch());
  console.log(errors);

  return (
    <Card className="max-w-[480px]">
      <CardHeader>
        <CardTitle>Character</CardTitle>
        <CardDescription>Insert Character</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label>Name Character</Label>
            <Input {...register("name")} />
          </div>
          <div>
            <Label>Clan</Label>
            <Input {...register("clan")} />
          </div>
          <Controller
            control={control}
            render={({ field }) => <Multiple type="Character" field={field} />}
            name="type"
          />
          <Controller
            control={control}
            render={({ field }) => <Multiple type="Nature" field={field} />}
            name="natureType"
          />
          <Controller
            control={control}
            render={({ field }) => <Multiple type="Bijuu" field={field} />}
            name="bijuu"
          />
          <Controller
            control={control}
            name="kekkeiGenkai"
            render={({ field }) => (
              <InputTags text="Kekkei-Genkai" field={field} />
            )}
          />
          <div>
            <Label>Image Uploader</Label>
            <Controller
              control={control}
              render={({ field }) => <DropzoneImage field={field} />}
              name="image"
            />
          </div>
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
