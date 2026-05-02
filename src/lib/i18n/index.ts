import {
  availableLocales,
  defaultLocale,
  localeStorageKey,
  type Locale,
} from "@/lib/i18n/config";
import { en } from "@/lib/i18n/locales/en";
import { tr } from "@/lib/i18n/locales/tr";
import type { LanguageMessages } from "@/types/i18n";

export const messages: Record<Locale, LanguageMessages> = {
  tr,
  en,
};

export type Messages = (typeof messages)[Locale];
export type { Locale } from "@/lib/i18n/config";

export { availableLocales, defaultLocale, localeStorageKey };
