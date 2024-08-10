import { Pen } from "lucide-react";
import { Button, ButtonStyles } from "./ui/button";
import { DialogDelete } from "./dialogDelete";
import { CharacterSchemaType } from "prisma/zod/character";
import { BijuuSchemaType } from "prisma/zod/bijuu";
import { ClanSchemaType } from "prisma/zod/cla";
import { kekkeiGenkaiSchemaType } from "prisma/zod/kekkei-genkai";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuery } from "@/hooks/delete";
import ky from "ky";
import Link from "next/link";

type Props = {
  character:
    | CharacterSchemaType
    | BijuuSchemaType
    | ClanSchemaType
    | kekkeiGenkaiSchemaType;
  search: string | null;
};

export function EditCards({ character, search }: Props) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteQuery,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["characters"] });
    },
  });

  async function deleteCharacter(
    characterId: string | undefined | null,
    characterImage: string
  ) {
    if (characterId && characterImage && search) {
       toast.promise(ky.delete("/api/uploadthing", {
        json: { key: characterImage },
      }), {
        loading: "Deleting...",
        success: "Character deleted",
        error: "Error to delete character",
      });
      mutateAsync({ characterId, search })
    }
  }

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-4 z-20 hidden group-hover/edit:flex">
      <DialogDelete>
        <Button
          variant="destructive"
          onClick={() => deleteCharacter(character.id, character.image)}
          disabled={isPending}
        >
          {isPending ? "Deleting..." : "Delete Character"}
        </Button>
      </DialogDelete>
      <Button variant="ghost" className="animate-jump-in rounded-md" asChild>
      <Link
        href={{query: {type: search, id: character.id}}}
        onClick={() => {scrollTop()}}
      >
        <Pen className="w-8 h-8 text-primary" />
      </Link>
      </Button>
    </div>
  );
}
