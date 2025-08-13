import { VideoObjectSchemaType } from "@/src/schemas/videoObject"

export const getVideoStructuredData = (videoObject: VideoObjectSchemaType) => {

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
