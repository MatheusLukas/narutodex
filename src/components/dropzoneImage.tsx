"use client";
import ky from "ky";
import { useState } from "react";
import Image from "next/image";
import { DialogDelete } from "./dialogDelete";
import { Button } from "./ui/button";
import { ControllerRenderProps } from "react-hook-form";

import { UploadDropzone } from "@/utils/uploadthing";
import { toast } from "sonner";
import { CharacterSchemaType } from "@/zodAutoGenSchemas";
import { BijuuSchemaType } from "prisma/zod/bijuu";
import { kekkeiGenkaiSchemaType } from "prisma/zod/kekkei-genkai";
import { ClanSchemaType } from "prisma/zod/cla";

type Props = {
  field:
    | ControllerRenderProps<CharacterSchemaType, "image">
    | ControllerRenderProps<BijuuSchemaType, "image">
    | ControllerRenderProps<kekkeiGenkaiSchemaType, "image">
    | ControllerRenderProps<ClanSchemaType, "image">;
};

export function DropzoneImage({ field }: Props) {
  const [key, setKey] = useState<string>();
  async function deleteImage() {
    await ky.delete("/api/uploadthing", {
      json: { key },
    });
  }

  return (
    <div>
      {field.value ? (
        <div className="relative">
          <Image
            className="object-cover w-full h-60 rounded-xl"
            src={field.value}
            width={1920}
            height={1080}
            alt="Uploaded Image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-700 to-zinc-500 opacity-50 rounded-xl" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <DialogDelete>
              <Button
                variant={"destructive"}
                onClick={() => {
                  deleteImage();
                  field.onChange(null);
                }}
              >
                Delete Image
              </Button>
            </DialogDelete>
          </div>
        </div>
      ) : (
        <UploadDropzone
          className="border-border border-4 p-4 hover:cursor-pointer bg-background ut-label:pointer-events-none"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            field.onChange(res[0].url);
            setKey(res[0].key);
            toast.success("Image uploaded");
          }}
          onUploadError={() => {
            toast.error("Error to upload image");
          }}
          onUploadBegin={(name) => {
            toast.message(`Uploading: ${name}`);
          }}
        />
      )}
    </div>
  );
}
