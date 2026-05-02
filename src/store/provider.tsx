"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { defaultLocale, localeStorageKey, isValidLocale, type Locale } from "@/lib/i18n/config";
import { setLocale } from "@/store/language";
import { setFavoritesFromStorage } from "@/store/favorites";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { makeStore } from "@/store/index";

const favoritesStorageKey = "bets-favorites";

function LanguagePersistence() {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.language.locale);

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(localeStorageKey);
    if (isValidLocale(savedLocale)) {
      dispatch(setLocale(savedLocale));
    }
  }, [dispatch]);

  useEffect(() => {
    const activeLocale = locale || defaultLocale;
    window.localStorage.setItem(localeStorageKey, activeLocale);
    document.documentElement.lang = activeLocale;
  }, [locale]);

  return null;
}

function FavoritesPersistence() {
  const dispatch = useAppDispatch();
  const favoritesByMatchId = useAppSelector((state) => state.favorites.byMatchId);

  useEffect(() => {
    const rawFavorites = window.localStorage.getItem(favoritesStorageKey);
    if (!rawFavorites) return;

    try {
      const parsedFavorites = JSON.parse(rawFavorites) as Record<string, boolean>;
      dispatch(setFavoritesFromStorage(parsedFavorites));
    } catch {
      window.localStorage.removeItem(favoritesStorageKey);
    }
  }, [dispatch]);

  useEffect(() => {
    window.localStorage.setItem(favoritesStorageKey, JSON.stringify(favoritesByMatchId));
  }, [favoritesByMatchId]);

  return null;
}

export function StoreProvider({ children, initialLocale }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [store] = useState(() => 
    makeStore(initialLocale ? { language: { locale: initialLocale } } : undefined)
  );

  return (
    <Provider store={store}>
      <LanguagePersistence />
      <FavoritesPersistence />
      {children}
    </Provider>
  );
}
