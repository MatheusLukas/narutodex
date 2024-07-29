import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "./fetcher";

export const useGetCharacters = (type: string) => {
  return useQuery({
    queryKey: ["characters", type],
    queryFn: () => getCharacters(type),
  });
};
