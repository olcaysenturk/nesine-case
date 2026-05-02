import type { Locale } from "@/lib/i18n/config";

export type HeaderMessages = {
  language: {
    label: string;
    options: Record<Locale, string>;
  };
  logo: {
    primary: string;
    secondary: string;
  };
  profile: {
    name: string;
    description: string;
    menu: {
      signOut: string;
    };
  };
  mobileMenu: {
    title: string;
    closeAria: string;
    openAria: string;
  };
};

export type FooterMessages = {
  brand: string;
  copyright: string;
};

export type HomeMessages = {
  title: string;
  description: string;
  placeholderTitle: string;
  placeholderDescription: string;
};

export type BetsMessages = {
  loading: string;
  fetch_error: string;
  favorites_title: string;
  favorites_empty: string;
  coupon_title: string;
  match_result: string;
  max_odd: string;
  coupon_amount: string;
  coupon_count: string;
  max_winnings: string;
  play_now: string;
  empty_coupon_title: string;
  empty_coupon_subtitle: string;
  no_extra_markets: string;
  favorite_add: string;
  favorite_remove: string;
  extra_markets_toggle: string;
  score: string;
  over_label: string;
  yes_label: string;
  no_label: string;
  under_label: string;
  mbs: string;
  handicap_label: string;
  amount_unit: string;
  count_unit: string;
};

export type SEOTags = {
  title: string;
  description: string;
};

export type SEOMessages = {
  global: SEOTags & { keywords: string };
  home: SEOTags;
};

export type LanguageMessages = {
  header: HeaderMessages;
  footer: FooterMessages;
  home: HomeMessages;
  bets: BetsMessages;
  seo: SEOMessages;
};
