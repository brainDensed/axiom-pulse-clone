import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PulseToken } from "@/components/pulse/types";

interface PulseState {
  sorts: Record<string, { key: string; direction: "asc" | "desc" }>;
  activeTokenId: string | null;
  buyModalTokenId: string | null;
}

const defaultSort = { key: "marketCap", direction: "desc" } as const;

const initialState: PulseState = {
  sorts: {
    new: { ...defaultSort },
    final: { ...defaultSort },
    migrated: { ...defaultSort },
  },
  activeTokenId: null,
  buyModalTokenId: null,
};

const pulseSlice = createSlice({
  name: "pulse",
  initialState,
  reducers: {
    setSort(
      state,
      action: PayloadAction<{ columnId: string; key: string; direction: "asc" | "desc" }>
    ) {
      state.sorts[action.payload.columnId] = {
        key: action.payload.key,
        direction: action.payload.direction,
      };
    },
    openModal(state, action: PayloadAction<{ id: string; initialData?: PulseToken }>) {
      state.activeTokenId = action.payload.id;
    },
    closeModal(state) {
      state.activeTokenId = null;
    },
    openBuyModal(state, action: PayloadAction<{ id: string; initialData?: PulseToken }>) {
      state.buyModalTokenId = action.payload.id;
    },
    closeBuyModal(state) {
      state.buyModalTokenId = null;
    }
  },
});

export const { setSort, openModal, closeModal, openBuyModal, closeBuyModal } = pulseSlice.actions;
export default pulseSlice.reducer;