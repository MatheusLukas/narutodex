"use client";
import { useGetCharacters } from "@/hooks/get-characters/hook";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { SkeletonCard } from "./skeletonCard";
import { EditCards } from "./editCards";
import { CharacterSchemaType } from "prisma/zod/character";
import { BorderBeam } from "./magicui/border-beam";
import { cn } from "mizuhara/utils";
import GradualSpacing from "./magicui/gradual-spacing";

enum FieldType {
  natureType = "Nature Type",
  clan = "Clan",
  kekkeiGenkai = "Kekkei Genkai",
  bijuu = "Bijuu",
  village = "Village",
  history = "History",
  jinchuurikis = "Jinchuuriki",
  description = "Description",
}

export function CardCategory() {
  type ColorKey =
    | "hokage"
    | "kazekage"
    | "raikage"
    | "tsuchikage"
    | "mizukage"
    | "akatsuki"
    | "character"
    | "clan"
    | "jinchuuriki"
    | "kekkei-genkai"
    | "bijuu";
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search: ColorKey =
    (searchParams.get("type") as ColorKey) || "character";
  const { data, isLoading } = useGetCharacters(search || "");
  const verifyKey = (key: string) => {
    return key !== "id" && key !== "image" && key !== "name" && key !== "type";
  };
  const verifySearch = (search: ColorKey) => {
    return search === "character"
      ? "bottom-40 md:bottom-32"
      : search === "clan"
      ? "bottom-20"
      : search === "kekkei-genkai"
      ? "bottom-20 md:bottom-16"
      : search === "bijuu" && "bottom-24";
  };

  const formatValue = (value: string | string[] | undefined | null) => {
    if (value === undefined || value === null) return "--/--";
    if (value.length === 0) return "--/--";
    if (Array.isArray(value)) {
      return value
        .map((v) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase())
        .join(", ");
    } else {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
  };

  const colorFrom = {
    hokage: "#006400",
    kazekage: "#FFD700",
    raikage: "#0000FF",
    tsuchikage: "#B8860B",
    mizukage: "#008080",
    akatsuki: "#540707",
    character: "#F97316",
    clan: "#F97316",
    jinchuuriki: "#F97316",
    "kekkei-genkai": "#F97316",
    bijuu: "#F97316",
  };

  const colorTo = {
    hokage: "#90EE90",
    kazekage: "#F0E68C",
    raikage: "#4169E1",
    tsuchikage: "#9B7F5C",
    mizukage: "#7FFFD4",
    akatsuki: "#ec5353",
    character: "#EF4444",
    clan: "#EF4444",
    jinchuuriki: "#EF4444",
    "kekkei-genkai": "#EF4444",
    bijuu: "#EF4444",
  };
  return (
    <div className="container w-fit my-20 space-y-16">
      <div>
        <GradualSpacing
          text={search.replace(/_/g, " ")}
          className={cn(
            "text-balance text-4xl md:text-6xl font-extrabold tracking-tight capitalize",
            search
          )}
          key={search}
        />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-10">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array.isArray(data) && data.length > 0 ? (
            data?.map((character: CharacterSchemaType) => (
              <div
                className="relative rounded-xl h-fit group animate-fade-right animate-duration-500"
                key={character.id}
              >
                <div className="h-fit w-80 md:w-96 bg-slate-800 relative rounded-xl group/edit">
                  <Image
                    className="object-cover w-full h-80 rounded-t-xl"
                    src={character.image}
                    alt={character.image}
                    width={1920}
                    height={1080}
                    draggable={false}
                  />
                  {pathname === "/create" && (
                    <EditCards character={character} search={search} />
                  )}
                  <div
                    className={cn(
                      "absolute translate-x-1/2 right-1/2 flex items-center flex-col z-10",
                      verifySearch(search) || "bottom-32"
                    )}
                  >
                    <p className={cn("text-3xl font-bold", search)}>
                      {character.name}
                    </p>
                    <p className={cn("text-3xl font-bold", search)}>
                      {character.clan}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-muted opacity-50 rounded-xl" />
                  <div>
                    <div className="p-3">
                      {Object.keys(character).map((key: string) =>
                        verifyKey(key) ? (
                          <div key={key} className="text-white">
                            <p>
                              {FieldType[key as keyof typeof FieldType]}:{" "}
                              {formatValue(
                                character[key as keyof typeof character]
                              )}
                            </p>
                          </div>
                        ) : null
                      )}
                    </div>
                  </div>
                </div>
                <BorderBeam
                  className="hidden md:block"
                  colorFrom={colorFrom[search]}
                  colorTo={colorTo[search]}
                  borderWidth={3}
                />
              </div>
            ))
          ) : (
            <div className="text-xl font-bold text-center col-span-3">
              No{" "}
              {(search as string) === "kekkei_genkai"
                ? "Kekkei Genkai"
                : search}{" "}
              created
            </div>
          )}
        </div>
      )}
    </div>
  );
}
