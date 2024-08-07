"use client";
import { Controller, useForm } from "react-hook-form";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { bijuuSchema } from "prisma/zod/bijuu";
import { InputTags } from "../tagsInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SelectBijuu } from "../select-bijuu";
import { toast } from "sonner";
import { useBijuu } from "@/store/bijuu";
import { useEffect, useState } from "react";
import { postQuery } from "@/hooks/post";
import { DropzoneImage } from "../dropzoneImage";
import { BijuuType, Type } from "@prisma/client";

export type InputsBijuu = {
  name: BijuuType;
  image: string;
  jinchuurikis: string[];
  history: string;
  type: Type[];
};

export function FormBijuu() {
  const queryClient = useQueryClient();
  const { bijuu } = useBijuu();

  const {mutateAsync} = useMutation({
    mutationFn: postQuery,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["characters"] });
    },
  });

  useEffect(() => {
    setValue("name", bijuu.name);
    setValue("image", bijuu.image);
    setValue("jinchuurikis", bijuu.jinchuurikis ?? []);
    setValue("history", bijuu.history ?? "");
  }, [bijuu]);

  const { register, handleSubmit, control, reset, setValue, watch } =
    useForm<InputsBijuu>({
      resolver: zodResolver(bijuuSchema),
      defaultValues: {
        name: bijuu.name,
        image: bijuu.image,
        jinchuurikis: bijuu.jinchuurikis,
        history: bijuu.history,
        type: ["BIJUU"],
      },
    });

  const onSubmit = (data: InputsBijuu) => {
    console.log("oi");
    toast.promise(mutateAsync({
      data: {
        id: bijuu.id,
        name: data.name,
        image: data.image,
        jinchuurikis: data.jinchuurikis,
        history: data.history,
        type: data.type,
      },
      search: "bijuu",
    }), {
      loading: "Deleting...",
      success: "Bijuu Created",
      error: "Error to create Bijuu"
    })

    reset();
    setValue("jinchuurikis", []);
    setValue("history", "");
    setValue("type", ["BIJUU"]);
  };


  return (
    <Card className="max-w-[480px]">
      <CardHeader>
        <CardTitle>Bijuu</CardTitle>
        <CardDescription>Insert Bijuu</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            control={control}
            render={({ field }) => <SelectBijuu field={field} />}
            name="name"
          />

          <div>
            <Label>History</Label>
            <Input {...register("history")} />
          </div>

          <Controller
            control={control}
            name="jinchuurikis"
            render={({ field }) => (
              <InputTags text="Jinchuurikis" field={field} />
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

          <Button
            onClick={() => console.log("oi")}
            className="w-full"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
