import { VideoObjectSchemaType } from "@/src/schemas/videoObject"
import VideoService from "@/src/services/VideoService"

const videoService = new VideoService()

export const getVideoStructuredData = (videoObject: VideoObjectSchemaType) => {
  const isValid = videoService.validateSchema(videoObject)
  if (!isValid) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: videoObject.title,
    description: videoObject.description,
    thumbnailUrl: videoObject.thumbnailUrl,
    uploadDate: videoObject.uploadDate,
    duration: videoObject.duration,
    contentUrl: videoObject.contentUrl,
    embedUrl: videoObject.embedUrl,
  }
}
