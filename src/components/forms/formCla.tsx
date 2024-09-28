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
import { clanSchema, ClanSchemaType } from "prisma/zod/cla";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { postQuery } from "@/hooks/post";
import { DropzoneImage } from "../dropzoneImage";
import { Type } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useGetCharacters } from "@/hooks/get-characters/hook";

export function FormCla() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? undefined;
  const { data: clan } = useGetCharacters<ClanSchemaType>("clan", id);

  const { mutateAsync } = useMutation({
    mutationFn: postQuery,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["characters"] });
    },
  });

  useEffect(() => {
    if (!clan) return;
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
  } = useForm<ClanSchemaType>({
    resolver: zodResolver(clanSchema),
    defaultValues: {
      id: undefined,
      name: clan?.name,
      type: ["CLAN"],
      image: clan?.image,
      village: clan?.village,
    },
  });

  const onSubmit = (data: ClanSchemaType) => {
    console.log(data, "data");
    toast.promise(
      mutateAsync(
        {
          data: {
            id: id,
            name: data.name,
            image: data.image,
            village: data.village,
            type: data.type,
          },
          search: "clan",
        },
        {
          onSuccess: () => {
            reset();
            setValue("type", ["CLAN"]);
            if (id) {
              const newUrl = new URL(window.location.href);
              newUrl.searchParams.delete("id");
              window.history.pushState({}, "", newUrl.toString());
            }
          },
        }
      ),
      {
        loading: id ? "Updating..." : "Creating...",
        success: id ? "Clan Updated" : "Clan Created",
        error: id ? "Error to update Clan" : "Error to create Clan",
      }
    );
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
            {id ? "Update" : "Create"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
