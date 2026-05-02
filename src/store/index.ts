import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { languageReducer } from "@/store/language";
import { betsReducer } from "@/store/bets";
import { betCartReducer } from "@/store/cart";
import { favoritesReducer } from "@/store/favorites";

const rootReducer = combineReducers({
  language: languageReducer,
  bets: betsReducer,
  betCart: betCartReducer,
  favorites: favoritesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
