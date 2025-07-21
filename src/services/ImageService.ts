import { ModularContentSchemaType } from '@/src/schemas'
import { urlFor } from '@/src/lib/client'

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
