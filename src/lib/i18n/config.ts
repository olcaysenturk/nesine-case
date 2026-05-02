export const availableLocales = ["tr", "en"] as const;

export type Locale = (typeof availableLocales)[number];

export const defaultLocale: Locale = "tr";
export const localeStorageKey = "dashboard-locale";

export const isValidLocale = (locale: string | null): locale is Locale => {
  return availableLocales.includes(locale as Locale);
};
