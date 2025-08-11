import { ImageObjectSchemaType, ModularContentSchemaType, GuidePageSchemaType, SubPageSchemaType } from '@/src/schemas'
import { urlFor } from '@/src/lib/client'
import { getVanityStub } from '@sanity/asset-utils'

class ImageService {
  getImagesXML = (images: string[]) => {
    return images.map((url) => {
      return { loc: new URL(url) }
    })
  }
  // vanityImageLoader = ({
  //   image,
  //   width,
  //   quality,
  // }: {
  //   image: SanityImageSchemaType,
  //   width: number,
  //   quality?: number,
  // }): string => {
  //   if (!image) return ''
  //   const originalFileName = urlFor(image).url().split('/').pop()?.split('.')[0]
  //   const stub = getVanityStub(originalFileName, image.vanityFileName)
  //   console.log('stub', stub)
  //   const url = `https://cdn.sanity.io/images/your-project-id/production/${stub}?w=${width}&q=${quality || 75}`
  //   return url
  // }
  getImagesFromModularContent = (
    modularContent: ModularContentSchemaType,
    images: string[] = []
  ) => {
    if (!modularContent) return null
    modularContent.forEach((object) => {
      if (object._type === 'image-object') {
        images.push(object.src)
        return images
      }
      if (typeof object === 'object') {
        const obj = object as Record<string, any>
        Object.keys(obj).forEach((key) => {
          return this.getImagesFromModularContent(obj[key], images)
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
