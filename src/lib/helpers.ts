// import { parseDocument } from 'htmlparser2'
import { Object as ObjectType } from '@/src/types'
import { ObjectSchemaType } from '@sanity/types'
import { ModularContentSchemaType } from '@/src/schemas'

export const removeLeadingSubString = (str, subStr) => {
  if (str) {
    if (str.startsWith(subStr)) {
      return decodeURI(str.slice(subStr.length))
        .replaceAll('ä', 'a')
        .replaceAll('ö', 'o')
        .replaceAll('å', 'a')
    } else {
      return decodeURI(str)
        .replaceAll('ä', 'a')
        .replaceAll('ö', 'o')
        .replaceAll('å', 'a')
    }
  }
}

const replaceStringInJson = (json, callback) => {
  if (Array.isArray(json)) {
    return json.map((item) => replaceStringInJson(item, callback))
  } else if (typeof json === 'object') {
    return Object.fromEntries(
      Object.entries(json).map(([key, value]) => [
        key,
        replaceStringInJson(value, callback),
      ])
    )
  } else if (typeof json === 'string') {
    json = callback(json)
  }
  return json
}

const findImages = (nodes) => {
  const images: string[] = []
  nodes.forEach((node) => {
    if (node.type === 'tag' && node.name === 'img') {
      images.push(node.attribs.src)
    } else if (node.children) {
      images.push(...findImages(node.children))
    }
  })
  return images
}

export const removeHTMLTags = (str) => {
  if (str) {
    return str.replace(/(<([^>]+)>)/gi, '')
  }
}

export const extractSlugFromUrl = (url) => {
  const wordpressUrl = new URL(url)
  return wordpressUrl.pathname
}

export const removeFirstSlash = (url) => {
  return url?.startsWith('/') ? url.slice(1) : url
}

export const sitemapImages = (images: string[]) => {
  return images.map((image) => {
    try {
      return { loc: new URL(image) }
    } catch (e) {
      console.error('Image url is not valid', image, e)
      return null
    }
  })
}

export const getBlockHeadings = (blocks) => {
  if (!blocks) return []
  const headings = blocks.map((block) => {
    if (
      block.__typename === 'FlamingoHeading' &&
      block.attributes?.level === 2
    ) {
      return block
    }
    if (block.__typename === 'FlamingoRating') {
      let data
      try {
        data = JSON.parse(block.renderedHtml)
      } catch (e) {
        console.error(e)
        return null
      }
      return {
        attributes: {
          text: data.title,
        },
      }
    }
    if (
      block.__typename === 'CoreGroup' ||
      block.__typename === 'CoreColumns'
    ) {
      return getBlockHeadings(block.innerBlocks)
    }
    return null
  })
  return headings.flat().filter((heading) => heading)
}

export const getImagesFromContent = (content) => {
  const parsedDocument = parseDocument(content)
  return findImages(parsedDocument.children)
}

export const isCurrentPath = (currentPath, path) => {
  if (!currentPath || !path) return false
  return currentPath.replaceAll('/', '') === path.replaceAll('/', '')
}

export const insertBreadcrumbAtIndex = (breadcrumbs, index, breadcrumb) => {
  const oldBreadcrumbs = [...breadcrumbs]
  oldBreadcrumbs.splice(index, 0, breadcrumb)
  return oldBreadcrumbs
}

export const isUrl = (str: string) => {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

export const isJson = (str: string) => {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

export const replaceInternalLinkBaseUrls = (str) => {
  if (!str) return str
  let url
  let json
  if (isUrl(str)) {
    url = new URL(str)
  } else if (isJson(str)) {
    json = JSON.parse(str)
  } else {
    return str
  }
  if (url && url.hostname === process.env.WORDPRESS_BASE_URL) {
    return str.replace(process.env.WORDPRESS_BASE_URL, process.env.SITE_URL)
  }
  if (json) {
    const outputJson = replaceStringInJson(json, (str) => {
      let url
      if (isUrl(str)) {
        url = new URL(str)
      } else {
        return str
      }
      if (
        url &&
        process.env.WORDPRESS_BASE_URL?.includes(url.hostname) &&
        !url.pathname.includes('wp-content')
      ) {
        return str.replace(process.env.WORDPRESS_BASE_URL, process.env.SITE_URL)
      } else {
        return str
      }
    })
    return JSON.stringify(outputJson)
  }
}

export const slugify = (str) => {
  return str ? str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replaceAll('ä', 'a')
    .replaceAll('ö', 'o')
    .replaceAll('å', 'a') : ''
}

export const isValidSlug = (slug) => {
  return /[A-Za-z0-9]\/?$/.test(slug)
}

export const getSessionToken = (key) => {
  if (typeof window === 'undefined') return
  return window.sessionStorage.getItem(key)
}

export const setSessionToken = (key, value) => {
  if (typeof window === 'undefined') return
  window.sessionStorage.setItem(key, value)
}

export const getHeadingObjectsByPage = ({
  objects,
}: {
  objects: ModularContentSchemaType
}) => {
  return objects.filter((object) => {
    return (object._type === 'heading-object' && object.level === 2) || object._type === 'rating-object'
  })
}
