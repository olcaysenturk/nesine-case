import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { BetSlipSelection } from "@/types/bets";

export interface BetCartState {
  selectionsByMatchId: Record<string, BetSlipSelection>;
}

const initialState: BetCartState = {
  selectionsByMatchId: {},
};

const cartSlice = createSlice({
  name: "betCart",
  initialState,
  reducers: {
    toggleSelection(state, action: PayloadAction<BetSlipSelection>) {
      const selection = action.payload;
      const existing = state.selectionsByMatchId[selection.matchId];

      if (
        existing &&
        existing.selectedOption.key === selection.selectedOption.key &&
        existing.selectedOption.outcomeId === selection.selectedOption.outcomeId
      ) {
        delete state.selectionsByMatchId[selection.matchId];
        return;
      }

      state.selectionsByMatchId[selection.matchId] = selection;
    },
    removeSelectionByMatchId(state, action: PayloadAction<string>) {
      delete state.selectionsByMatchId[action.payload];
    },
    clearSelections(state) {
      state.selectionsByMatchId = {};
    },
  },
});

export const { toggleSelection, removeSelectionByMatchId, clearSelections } = cartSlice.actions;
export const betCartReducer = cartSlice.reducer;
