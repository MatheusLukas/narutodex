"use client";
import { useForm, Controller } from "react-hook-form";
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
import { clanSchema } from "prisma/zod/cla";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useClan } from "@/store/clan";
import { useEffect } from "react";
import { toast } from "sonner";
import { postQuery } from "@/hooks/post";
import { DropzoneImage } from "../dropzoneImage";
import { Type } from "@prisma/client";

export type InputsCla = {
  id?: string;
  name: string;
  image: string;
  village: string;
  type: Type[];
};

export function FormCla() {
  const queryClient = useQueryClient();
  const { clan } = useClan();

  const {mutateAsync} = useMutation({
    mutationFn: postQuery,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["characters"] });
    },
  });

  useEffect(() => {
    setValue("name", clan.name);
    setValue("image", clan.image);
    setValue("village", clan.village ?? "");
  }, [clan]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<InputsCla>({
    resolver: zodResolver(clanSchema),
    defaultValues: {
      id: undefined,
      name: clan.name,
      type: ["CLAN"],
      image: clan.image,
      village: clan.village,
    },
  });

  const onSubmit = (data: InputsCla) => {
    console.log(data, "data");
    toast.promise(mutateAsync({
      data: {
        id: clan.id,
        name: data.name,
        image: data.image,
        village: data.village,
        type: data.type,
      },
      search: "clan",
    }), {
      loading: "Creating...",
      success: "Clan Created",
      error: "Error to create Clan"
    });
    reset();
    setValue("type", ["CLAN"]);
  };


  return (
    <Card className="max-w-[480px]">
      <CardHeader>
        <CardTitle>Cla</CardTitle>
        <CardDescription>Insert Cla</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label>Name Cla</Label>
            <Input {...register("name")} />
          </div>
          <div>
            <Label>Village</Label>
            <Input {...register("village")} />
          </div>
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
