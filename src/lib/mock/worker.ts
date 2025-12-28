
import { NEW_PAIRS_MOCK, FINAL_STRETCH_MOCK, MIGRATED_MOCK } from "./tokens";
import { updateTokens } from "./updater";
import { PulseToken } from "@/components/pulse/types";

type pulseState = {
    newPairs: PulseToken[];
    finalStretch: PulseToken[];
    migrated: PulseToken[];
}

const state: pulseState = {
    newPairs: NEW_PAIRS_MOCK,
    finalStretch: FINAL_STRETCH_MOCK,
    migrated: MIGRATED_MOCK,
}

self.postMessage(state);

setInterval(() => {
    state.newPairs = updateTokens(state.newPairs);
    state.finalStretch = updateTokens(state.finalStretch);
    state.migrated = updateTokens(state.migrated);

    self.postMessage(state);
}, 5000);
