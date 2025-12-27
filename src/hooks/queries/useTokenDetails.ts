import { fetchTokenData } from "@/services/api/tokenApi";
import { useQuery } from "@tanstack/react-query";
import { PulseToken } from "@/components/pulse/types";

export function useTokenDetails(tokenId: string, initialData?: PulseToken) {
  return useQuery({
    queryKey: ["token-details", tokenId],
    queryFn: () => fetchTokenData(tokenId),
    staleTime: 60 * 1000,
    enabled: !!tokenId,
    initialData,
    refetchInterval: 10 * 1000,
  });
}
