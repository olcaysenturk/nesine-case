import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FavoritesState {
  byMatchId: Record<string, boolean>;
}

const initialState: FavoritesState = {
  byMatchId: {},
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const matchId = action.payload;
      if (state.byMatchId[matchId]) {
        delete state.byMatchId[matchId];
        return;
      }
      state.byMatchId[matchId] = true;
    },
    setFavoritesFromStorage(state, action: PayloadAction<Record<string, boolean>>) {
      state.byMatchId = action.payload;
    },
  },
});

export const { toggleFavorite, setFavoritesFromStorage } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
