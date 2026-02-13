class ImageService {
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
