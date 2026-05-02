import { MetadataRoute } from 'next'
import { cookies } from 'next/headers'
import { defaultLocale, messages, Locale } from '@/lib/i18n'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const cookieStore = await cookies()
  const locale = (cookieStore.get("NEXT_LOCALE")?.value as Locale) || defaultLocale
  const t = messages[locale].seo.global

  return {
    name: t.title,
    short_name: locale === 'tr' ? 'Nesine Panel' : 'Nesine Panel',
    description: t.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
