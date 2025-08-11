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
    modularContent: unknown,
    images: string[] = []
  ): string[] => {
    if (!modularContent) return images
    if (Array.isArray(modularContent)) {
      for (const item of modularContent) {
        this.getImagesFromModularContent(item, images)
      }
      return images
    }
    if (typeof modularContent === 'object') {
      const obj = modularContent as Record<string, any>
      if (obj._type === 'image-object' && typeof obj.src === 'string') {
        images.push(obj.src)
        return images
      }
      for (const value of Object.values(obj)) {
        this.getImagesFromModularContent(value, images)
      }
    }
    return images
  }
}

export default ImageService
