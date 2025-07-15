import { getServerSideSitemap } from 'next-sitemap'
import { getSitemap } from '@/src/lib/api'
import { AuthorSchemaType } from '@/src/schemas'

export async function GET() {
  const authorsResponse: AuthorSchemaType[] = await getSitemap('authors')
  const pages = authorsResponse.map((item) => {
    return {
      loc: `${process.env.SITE_URL}/om-oss/${item.slug.current}`,
    }
  })

  return getServerSideSitemap(pages)
}
