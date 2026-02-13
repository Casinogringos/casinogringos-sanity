// Converts Sanity portable text array to plain text
import { ModularContentSchemaType } from '@/src/schemas/modularContent'
import { HeadingObjectSchemaType } from '@/src/schemas/headingObject'
import { RatingObjectSchemaType } from '@/src/schemas/ratingObject'

export function portableTextToPlainText(blocks: any[]): string {
  if (!Array.isArray(blocks)) return ''
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) return ''
      return block.children.map((child: any) => child.text).join('')
    })
    .join('\n')
    .replace(/\n+/g, '\n')
    .trim()
}

export const sitemapImages = (images: string[]) => {
  return images.map((image) => ({ loc: new URL(image) }))
}

export const isCurrentPath = (currentPath: string, path: string) => {
  if (!currentPath || !path) return false
  return currentPath.replaceAll('/', '') === path.replaceAll('/', '')
}

export const slugify = (str: string) => {
  return str
    ? str
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replaceAll('ä', 'a')
        .replaceAll('ö', 'o')
        .replaceAll('å', 'a')
    : ''
}

export const getSessionToken = (key: string) => {
  if (typeof window === 'undefined') return
  return window.sessionStorage.getItem(key)
}

export const setSessionToken = (key: string, value: string) => {
  if (typeof window === 'undefined') return
  window.sessionStorage.setItem(key, value)
}

export const getHeadingObjectsByPage = ({
  objects,
}: {
  objects: ModularContentSchemaType
}) => {
  return objects.filter((object) => {
    return (
      (object._type === 'heading-object' && object.level === 2) ||
      object._type === 'rating-object'
    )
  }) as Array<HeadingObjectSchemaType | RatingObjectSchemaType>
}

export const formatSlug = (slug: string) => {
  if (slug.startsWith('/') && !slug.endsWith('/')) {
    return slug
  }
  let newSlug = slug
  if (!slug.startsWith('/')) {
    newSlug = `/${newSlug}`
  }
  if (slug.endsWith('/')) {
    newSlug = newSlug.slice(0, -1)
  }
  return newSlug
}
