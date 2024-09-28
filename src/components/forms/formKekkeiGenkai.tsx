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
import {
  kekkeiGenkaiSchema,
  kekkeiGenkaiSchemaType,
} from "prisma/zod/kekkei-genkai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { postQuery } from "@/hooks/post";
import { DropzoneImage } from "../dropzoneImage";
import { Type } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useGetCharacters } from "@/hooks/get-characters/hook";

export function FormKekkeiGenkai() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? undefined;
  const { data: kekkeiGenkai } = useGetCharacters<kekkeiGenkaiSchemaType>(
    "kekkei_genkai",
    id
  );

  const { mutateAsync } = useMutation({
    mutationFn: postQuery,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["characters"] });
    },
  });

  useEffect(() => {
    if (!kekkeiGenkai) return;
    setValue("name", kekkeiGenkai.name);
    setValue("image", kekkeiGenkai.image);
    setValue("description", kekkeiGenkai.description ?? "");
  }, [kekkeiGenkai]);

  const { register, handleSubmit, reset, setValue, control } =
    useForm<kekkeiGenkaiSchemaType>({
      resolver: zodResolver(kekkeiGenkaiSchema),
      defaultValues: {
        name: kekkeiGenkai?.name,
        image: kekkeiGenkai?.image,
        description: kekkeiGenkai?.description,
        type: ["KEKKEI_GENKAI"],
      },
    });

  const onSubmit = (data: kekkeiGenkaiSchemaType) => {
    toast.promise(
      mutateAsync(
        {
          data: {
            id: id,
            name: data.name,
            image: data.image,
            description: data.description,
            type: data.type,
          },
          search: "kekkei_genkai",
        },
        {
          onSuccess: () => {
            reset();
            setValue("description", "");
            setValue("type", ["KEKKEI_GENKAI"]);
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
        success: id ? "Kekkei Genkai Updated" : "Kekkei Genkai Created",
        error: id
          ? "Error to update Kekkei Genkai"
          : "Error to create Kekkei Genkai",
      }
    );
  };

  return (
    <Card className="max-w-[480px]">
      <CardHeader>
        <CardTitle>Kekkei Genkai</CardTitle>
        <CardDescription>Insert Kekkei Genkai</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label>Name Kekkei Genkai</Label>
            <Input {...register("name")} />
          </div>

          <div>
            <Label>Description</Label>
            <Input {...register("description")} />
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
