import { getServerSideSitemap } from 'next-sitemap'

export async function GET() {
  // TODO: Add video sitemap by parsing each page for video embeds?

  return getServerSideSitemap([])
}
