import { PulseToken } from "@/components/pulse/types";


export type pulseState = {
    newPairs: PulseToken[];
    finalStretch: PulseToken[];
    migrated: PulseToken[];
}
type Listener = (tokens: pulseState) => void;

let listeners: Listener[] = [];
let worker: Worker | null = null;
let lastState: pulseState | null = null;

export function getSnapshot() {
    return lastState || { newPairs: [], finalStretch: [], migrated: [] };
}

function initWorker() {
    if (typeof window === 'undefined' || worker) return;

    worker = new Worker(new URL('./worker.ts', import.meta.url));
    worker.onmessage = (event) => {
        lastState = event.data;
        listeners.forEach((listener) => listener(event.data));
    };
}

export function subscribe(listener: Listener) {
    if (!worker) {
        initWorker();
    }

    listeners.push(listener);
    if (lastState) {
        listener(lastState);
    }

    return () => {
        listeners = listeners.filter(l => l !== listener);
    }
}

