import { getClient } from '@/src/lib/client'
import {
  pageBySlugQuery,
  menuByIdQuery,
  newsPageBySlugQuery,
  slotPageBySlugQuery,
  slotPagePreviewsQuery,
  newsPageCountQuery,
  sitemapQuery,
  authorBySlugQuery,
  toplistByIdQuery,
} from '@/src/data/queries'
import { casinoPageBySlugQuery } from '@/src/data/queries'
import { guidePageBySlugQuery } from '@/src/data/queries'
import { guidePagePreviewsQuery } from '@/src/data/queries'
import { guidePageCountQuery } from '@/src/data/queries'
import { newsPagePreviewsQuery } from '@/src/data/queries'
import { staticParamsQuery } from '@/src/data/queries'
import { similarCasinoPagesQuery } from '@/src/data/queries'
import { casinoPagesQuery } from '@/src/data/queries'
import { similarGuidePagesQuery } from '@/src/data/queries'
import { casinoPagePreviewsQuery } from '@/src/data/queries'
import { similarNewsPagesQuery } from '@/src/data/queries'
import { similarSlotPagesQuery } from '@/src/data/queries'
import { SlotPageSchemaType } from '@/src/schemas'
import { casinoPagesByCasinosQuery } from '@/src/data/queries'
const client = getClient()

export const getPageBySlug = async ({ slug }: { slug: string }) => {
  try {
    const data = await client.fetch(pageBySlugQuery({ slug }))
    return data[0]
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch page by slug: ${slug}`)
  }
}

export const getGuidePageCount = async () => {
  try {
    const data = await client.fetch(guidePageCountQuery())
    // console.log('data', data)
    return data
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch guide page count`)
  }
}

export const getSlotPagePreviews = async ({ count }: { count?: number }) => {
  try {
    const data = await client.fetch(slotPagePreviewsQuery({ count }))
    // console.log('data', data)
    return data
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch slot page previews`)
  }
}

export const getGuidePagePreviews = async ({
  count,
  offset,
}: {
  count: number
  offset: number
}) => {
  try {
    const data = await client.fetch(guidePagePreviewsQuery({ count, offset }))
    // console.log('data', data)
    return data
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch guide previews`)
  }
}

export const getNewsPagePreviews = async ({
  count,
  offset,
}: {
  count: number
  offset: number
}) => {
  try {
    const data = await client.fetch(newsPagePreviewsQuery({ count, offset }))
    // console.log('data', data)
    return data
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch news previews`)
  }
}

export const getNewsPageCount = async () => {
  try {
    const data = await client.fetch(newsPageCountQuery())
    // console.log('data', data)
    return data
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch news page count`)
  }
}

export const getGuidePageBySlug = async ({ slug }: { slug: string }) => {
  try {
    // console.log('pageBySlugQuery', pageBySlugQuery({ slug }))
    const data = await client.fetch(guidePageBySlugQuery({ slug }))
    // console.log('data', data)
    return data[0]
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch page by slug: ${slug}`)
  }
}

export const getSlotPageBySlug = async ({ slug }: { slug: string }) => {
  try {
    // console.log('pageBySlugQuery', pageBySlugQuery({ slug }))
    const data = await client.fetch(slotPageBySlugQuery({ slug }))
    // console.log('data', data)
    return data[0]
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch page by slug: ${slug}`)
  }
}

export const getCasinoPageBySlug = async ({ slug }: { slug: string }) => {
  try {
    // console.log('pageBySlugQuery', pageBySlugQuery({ slug }))
    const data = await client.fetch(casinoPageBySlugQuery({ slug }))
    // console.log('data', data)
    return data[0]
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch page by slug: ${slug}`)
  }
}

export const getNewsPageBySlug = async ({ slug }: { slug: string }) => {
  try {
    console.log('pageBySlugQuery', pageBySlugQuery({ slug }))
    const data = await client.fetch(newsPageBySlugQuery({ slug }))
    // console.log('data', data)
    return data[0]
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch page by slug: ${slug}`)
  }
}

export const getMenuById = async ({ id }: { id: string }) => {
  try {
    // console.log('getMenuById', id)
    const data = await client.fetch(menuByIdQuery({ id }))
    console.log('data', data)
    return data
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch menu by id: ${id}`)
  }
}

export const getCasinoPagePreviews = async ({ count }: { count: number }) => {
  try {
    const data = await client.fetch(casinoPagePreviewsQuery({ count }))
    // console.log('casinoPreviewsQuery', data)
    return data
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch casino previews`)
  }
}

export const getStaticParams = async (
  type: 'pages' | 'casino-pages' | 'guide-pages' | 'news-pages' | 'authors' | 'slot-pages'
) => {
  try {
    const data = await client.fetch(staticParamsQuery({ type }))
    return data
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch static params`)
  }
}

export const getSimilarCasinoPages = async ({
  id,
  count = 5,
}: {
  id: string
  count?: number
}) => {
  try {
    const data = await client.fetch(similarCasinoPagesQuery({ id, count }))
    console.log('data', data)
    return data
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch similar casino pages`)
  }
}

export const getSimilarGuidePages = async ({
  id,
  count = 5,
}: {
  id: string
  count?: number
}) => {
  try {
    const data = await client.fetch(similarGuidePagesQuery({ id, count }))
    return data
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch similar guide pages`)
  }
}

export const getSimilarNewsPages = async ({
  id,
  count = 5,
}: {
  id: string
  count?: number
}) => {
  try {
    const data = await client.fetch(similarNewsPagesQuery({ id, count }))
    return data
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch similar news pages`)
  }
}

export const getSitemap = async (type: 'authors' | 'pages' | 'guide-pages' | 'news-pages' | 'casino-pages') => {
  try {
    const data = await client.fetch(sitemapQuery(type))
    return data
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch sitemap`)
  }
}

export const getAllCasinoPages = async () => {
  try {
    const data = await client.fetch(
      casinoPagesQuery({ count: 1000, content: false })
    )
    return data
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch all casino pages`)
  }
}

export const getAuthorBySlug = async ({ slug }: { slug: string }) => {
  try {
    const data = await client.fetch(authorBySlugQuery({ slug }))
    return data[0]
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch author by slug: ${slug}`)
  }
}

export const getSimilarSlotPages = async ({
  id,
  count = 5,
}: {
  id: string
  count?: number
}) => {
  try {
    const data = await client.fetch(similarSlotPagesQuery({ id, count }))
    return data
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch similar slot pages`)
  }
}

export const getCasinoPagesByCasinos = async ({
  casinoIds,
}: {
  casinoIds: string[]
}) => {
  try {
    const data = await client.fetch(casinoPagesByCasinosQuery({ casinoIds }))
    return data
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch casino pages by casinos`)
  }
}

export const getToplistById = async ({
  id,
}: {
  id: string
}) => {
  try {
    const data = await client.fetch(toplistByIdQuery({ id }))
    return data
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch toplist by id: ${id}`)
  }
}
