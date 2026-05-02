import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { defaultLocale, type Locale } from "@/lib/i18n";
import { LanguageState } from "@/types/store";

const initialState: LanguageState = {
  locale: defaultLocale,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
