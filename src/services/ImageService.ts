import { ModularContentSchemaType, SanityImageSchemaType } from '@/src/schemas'
import { urlFor } from '@/src/lib/client'
import { getVanityStub } from '@sanity/asset-utils'

class ImageService {
  getImagesXML = (images: string[]) => {
    return images.map((url) => {
      try {
        return { loc: new URL(url) }
      } catch (e) {
        console.error('Image url is not valid', url, e)
        return null
      }
    })
  }
  vanityImageLoader = ({
    image,
    width,
    quality,
  }: {
    image: SanityImageSchemaType,
    width: number,
    quality?: number,
  }): string => {
    if (!image) return ''
    const originalFileName = urlFor(image).url().split('/').pop()?.split('.')[0]
    const stub = getVanityStub(originalFileName, image.vanityFileName)
    console.log('stub', stub)
    const url = `https://cdn.sanity.io/images/your-project-id/production/${stub}?w=${width}&q=${quality || 75}`
    return url
  }
  getImagesFromModularContent = (
    modularContent: ModularContentSchemaType,
    images: string[] = []
  ) => {
    if (!modularContent) return null
    modularContent.forEach((object) => {
      if (object._type === 'image-object') {
        images.push(urlFor(object.image).url())
        return images
      }
      if (typeof object === 'object') {
        Object.keys(object).forEach((key) => {
          return this.getImagesFromModularContent(object[key], images)
        })
      }
      if (Array.isArray(object)) {
        for (const item of object) {
          this.getImagesFromModularContent(item, images)
        }
      }
    })
    return images
  }
}

export default ImageService
