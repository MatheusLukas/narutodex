import { Pen } from "lucide-react";
import { Button } from "./ui/button";
import { DialogDelete } from "./dialogDelete";
import { CharacterSchemaType } from "prisma/zod/character";
import { useCharacter } from "@/store/character";
import { BijuuSchemaType } from "prisma/zod/bijuu";
import { ClanSchemaType } from "prisma/zod/cla";
import { kekkeiGenkaiSchemaType } from "prisma/zod/kekkei-genkai";
import { useBijuu } from "@/store/bijuu";
import { toast } from "sonner";
import { useClan } from "@/store/clan";
import { useKekkeiGenkai } from "@/store/kekkei-genkai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuery } from "@/hooks/delete";
import ky from "ky";

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
      await ky.delete("/api/uploadthing", {
        json: { key: characterImage },
      });
      toast.promise(mutateAsync({ characterId, search }), {
        loading: "Deleting...",
        success: "Character deleted",
        error: "Error to delete character",
      });
    }
  }

  function insert() {
    if (search === "character") {
      useCharacter.getState().setCharacters(character as CharacterSchemaType);
    } else if (search === "bijuu") {
      useBijuu.getState().setBijuu(character as BijuuSchemaType);
    } else if (search === "clan") {
      useClan.getState().setClan(character as ClanSchemaType);
    } else if (search === "kekkei-genkai") {
      useKekkeiGenkai
        .getState()
        .setKekkeiGenkai(character as kekkeiGenkaiSchemaType);
    } else {
      toast.error("Error to insert");
    }
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
      <Button
        variant="ghost"
        className="animate-jump-in rounded-md"
        onClick={() => insert()}
      >
        <Pen className="w-8 h-8 text-primary" />
      </Button>
    </div>
  );
}
