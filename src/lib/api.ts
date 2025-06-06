import { getClient } from '@/src/lib/client'
import { pageBySlugQuery, menuByIdQuery } from '@/src/data/queries'
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

export const getMenuById = async ({ id }: { id: string }) => {
  try {
    console.log('getMenuById', id)
    const data = await client.fetch(menuByIdQuery({ id }))
    console.log('data', data)
    return data[0]
  } catch (e) {
    console.log(e)
    throw Error(`Failed to fetch menu by id: ${id}`)
  }
}
