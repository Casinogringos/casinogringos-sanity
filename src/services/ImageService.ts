class ImageService {
  getImageUrl({ imageId }: { imageId: string }) {
    return `https://images.casinogringos.se/images/${imageId}`
  }
}

export default ImageService
