import { getClient } from '@/src/lib/client'
import {
  pageBySlugQuery,
  menuByIdQuery,
  newsPageBySlugQuery,
  slotPageBySlugQuery,
} from '@/src/data/queries'
import { casinoPageBySlugQuery } from '@/src/data/queries/casinoPageBySlugQuery'
import { guidePageBySlugQuery } from '@/src/data/queries/guidePageBySlugQuery'
const client = getClient()

export const getPageBySlug = async ({ slug }: { slug: string }) => {
  try {
    console.log('pageBySlugQuery', pageBySlugQuery({ slug }))
    const data = await client.fetch(pageBySlugQuery({ slug }))
    // console.log('data', data)
    return data[0]
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch page by slug: ${slug}`)
  }
}

export const getGuidePageBySlug = async ({ slug }: { slug: string }) => {
  try {
    console.log('pageBySlugQuery', pageBySlugQuery({ slug }))
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
    console.log('pageBySlugQuery', pageBySlugQuery({ slug }))
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
    console.log('pageBySlugQuery', pageBySlugQuery({ slug }))
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
    console.log('getMenuById', id)
    const data = await client.fetch(menuByIdQuery({ id }))
    console.log('data', data)
    return data
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch menu by id: ${id}`)
  }
}
