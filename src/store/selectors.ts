import type { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";
import type { BetColumnKey, BetSlipSelection } from "@/types/bets";

export const selectBetsState = (state: RootState) => state.bets;
export const selectCartState = (state: RootState) => state.betCart;
export const selectFavoritesState = (state: RootState) => state.favorites;

export const selectMatches = (state: RootState) => selectBetsState(state).matches;
export const selectFetchStatus = (state: RootState) => selectBetsState(state).fetchStatus;
export const selectErrorMessage = (state: RootState) => selectBetsState(state).errorMessage;
export const selectVisibleCount = (state: RootState) => selectBetsState(state).visibleCount;

export const selectVisibleMatches = createSelector(
  [selectMatches, selectVisibleCount],
  (matches, visibleCount) => matches.slice(0, visibleCount)
);

export const selectCanLoadMore = (state: RootState) =>
  selectVisibleCount(state) < selectMatches(state).length;

export const selectSelectionsByMatchId = (state: RootState) =>
  selectCartState(state)?.selectionsByMatchId ?? {};

function isValidSelection(value: unknown): value is BetSlipSelection {
  if (!value || typeof value !== "object") return false;
  const selection = value as Partial<BetSlipSelection>;
  return (
    typeof selection.matchId === "string" &&
    typeof selection.matchName === "string" &&
    typeof selection.leagueName === "string" &&
    typeof selection.selectedOption === "object" &&
    selection.selectedOption !== null &&
    typeof selection.selectedOption.key === "string"
  );
}

export const selectSelections = createSelector([selectSelectionsByMatchId], (selectionsByMatchId) =>
  Object.values(selectionsByMatchId).filter(isValidSelection)
);

export const selectActiveSelectionByMatchId = createSelector([selectSelectionsByMatchId], (selectionsByMatchId) => {
  const activeMap: Record<string, BetColumnKey | null> = {};
  for (const [matchId, selection] of Object.entries(selectionsByMatchId)) {
    activeMap[matchId] = isValidSelection(selection) ? selection.selectedOption.key : null;
  }
  return activeMap;
});

export const selectTotalOdd = (state: RootState) =>
  selectSelections(state).reduce((sum, selection) => sum + (selection.selectedOption.odd || 0), 0);

export const selectFavoritesByMatchId = (state: RootState) =>
  selectFavoritesState(state).byMatchId;

export const selectFavoriteMatches = createSelector(
  [selectMatches, selectFavoritesByMatchId],
  (matches, favoritesByMatchId) => matches.filter((match) => favoritesByMatchId[match.id])
);
