"use client";

import { messages, type Locale } from "@/lib/i18n";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLocale } from "@/store/language";

export function useLanguage() {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.language.locale);

  return {
    locale,
    messages: messages[locale],
    setLocale: (nextLocale: Locale) => {
      dispatch(setLocale(nextLocale));
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    },
  };
}
