import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { BetsService } from "@/services/bets-service";
import { BettingMatch } from "@/types/bets";

export interface BetsState {
  matches: BettingMatch[];
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  errorMessage: string | null;
  visibleCount: number;
  lazyLoadBatchSize: number;
}

const initialState: BetsState = {
  matches: [],
  fetchStatus: "idle",
  errorMessage: null,
  visibleCount: 20,
  lazyLoadBatchSize: 20,
};

export const fetchBetsBulletin = createAsyncThunk("bets/fetchBetsBulletin", async () => {
  return await BetsService.getBets();
});

const betsSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    loadMoreMatches(state) {
      state.visibleCount = Math.min(
        state.visibleCount + state.lazyLoadBatchSize,
        state.matches.length
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBetsBulletin.pending, (state) => {
        state.fetchStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(fetchBetsBulletin.fulfilled, (state, action: PayloadAction<BettingMatch[]>) => {
        state.fetchStatus = "succeeded";
        state.matches = action.payload;
        state.visibleCount = Math.min(state.lazyLoadBatchSize, action.payload.length);
      })
      .addCase(fetchBetsBulletin.rejected, (state) => {
        state.fetchStatus = "failed";
        state.errorMessage = "Bülten verisi alınamadı";
      });
  },
});

export const { loadMoreMatches } = betsSlice.actions;
export const betsReducer = betsSlice.reducer;
