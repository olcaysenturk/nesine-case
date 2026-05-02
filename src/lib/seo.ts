import type { Metadata } from "next";
import { cookies } from "next/headers";
import { defaultLocale, messages, type Locale } from "@/lib/i18n";

async function getLocaleFromCookie(): Promise<Locale> {
  const cookieStore = await cookies();
  return (cookieStore.get("NEXT_LOCALE")?.value as Locale) || defaultLocale;
}

export async function buildGlobalMetadata(): Promise<Metadata> {
  const locale = await getLocaleFromCookie();
  const t = messages[locale].seo.global;
  const appName = process.env.NEXT_PUBLIC_APP_TITLE || "Role Management Dashboard";

  return {
    title: {
      default: t.title,
      template: `%s | ${appName}`,
    },
    description: t.description,
    keywords: t.keywords.split(", ").concat(["nesine", "iddaa", "spor toto"]),
    authors: [{ name: appName }],
    openGraph: {
      title: t.title,
      description: t.description,
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      siteName: appName,
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function buildPageMetadata(pageKey: "home"): Promise<Metadata> {
  const locale = await getLocaleFromCookie();
  const t = messages[locale].seo[pageKey];

  return {
    title: t.title,
    description: t.description,
  };
}

export { getLocaleFromCookie };
