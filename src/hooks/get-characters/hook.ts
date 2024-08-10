import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "./fetcher";

export const useGetCharacters = <T>(type: string, id?: string) => {
  return useQuery({
    queryKey: ["characters", type, id],
    queryFn: () => getCharacters(type, id) as Promise<T>,
  });
};
