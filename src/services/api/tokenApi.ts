import { PulseToken } from "@/components/pulse/types";
import { getSnapshot } from "@/lib/mock/stream";

export async function fetchTokenData(tokenId: string): Promise<PulseToken> {
    await new Promise(r => setTimeout(r, 800)); // mock network delay

    const state = getSnapshot();
    const allTokens = [...state.newPairs, ...state.finalStretch, ...state.migrated];

    const token = allTokens.find(t => t.id === tokenId);
    if (!token) {
        throw new Error("Token not found");
    }
    return token;
}