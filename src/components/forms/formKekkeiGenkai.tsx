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
import { kekkeiGenkaiSchema } from "prisma/zod/kekkei-genkai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useKekkeiGenkai } from "@/store/kekkei-genkai";
import { toast } from "sonner";
import { useEffect } from "react";
import { postQuery } from "@/hooks/post";
import { DropzoneImage } from "../dropzoneImage";
import { Type } from "@prisma/client";

export type InputsKekkeiGenkai = {
  id?: string;
  name: string;
  image: string;
  description: string;
  type: Type[];
};

export function FormKekkeiGenkai() {
  const queryClient = useQueryClient();
  const { kekkeiGenkai } = useKekkeiGenkai();

  const {mutateAsync} = useMutation({
    mutationFn: postQuery,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["characters"] });
    },
  });

  useEffect(() => {
    setValue("name", kekkeiGenkai.name);
    setValue("image", kekkeiGenkai.image);
    setValue("description", kekkeiGenkai.description ?? "");
  }, [kekkeiGenkai]);

  const { register, handleSubmit, reset, setValue, control } =
    useForm<InputsKekkeiGenkai>({
      resolver: zodResolver(kekkeiGenkaiSchema),
      defaultValues: {
        name: kekkeiGenkai.name,
        image: kekkeiGenkai.image,
        description: kekkeiGenkai.description,
        type: ["KEKKEI_GENKAI"],
      },
    });

  const onSubmit = (data: InputsKekkeiGenkai) => {
    toast.promise(mutateAsync({
      data: {
        id: kekkeiGenkai.id,
        name: data.name,
        image: data.image,
        description: data.description,
        type: data.type,
      },
      search: "kekkei_genkai",
    }), {
      loading: "Creating...",
      success: "Kekkei Genkai Created",
      error: "Error to create Kekkei Genkai"
    });
    reset();
    setValue("description", "");
    setValue("type", ["KEKKEI_GENKAI"]);
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
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
