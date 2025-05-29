const VideoPlayer = dynamic(() => import('../organisms/VideoPlayer'))
import { getYoutubeMetaData, getVimeoMetaData } from '../../lib/api'
import dynamic from 'next/dynamic'

const VideoPlayerWrapper = async ({ attributes }) => {
  const { url, type, caption } = attributes
  let structuredData = {}
  if (type === 'youtube') {
    const videoObject = await getYoutubeMetaData(url)
    if (!videoObject) {
      return <VideoPlayer url={url} caption={caption} />
    }
    const { snippet, contentDetails } = videoObject
    structuredData = {
      '@context': 'http://schema.org',
      '@type': 'VideoObject',
      name: snippet.title ?? '',
      description: snippet.description ?? '',
      thumbnailUrl: [snippet.thumbnails?.default.url ?? ''],
      uploadDate: snippet.publishedAt ?? '',
      duration: contentDetails.duration ?? '',
      embedUrl: url ?? '',
    }
  } else if (type === 'vimeo') {
    const videoObject = await getVimeoMetaData(url)
    if (!videoObject) {
      return <VideoPlayer url={url} caption={caption} />
    }
    structuredData = {
      '@context': 'http://schema.org',
      '@type': 'VideoObject',
      name: videoObject.name ?? '',
      description: videoObject.description ?? '',
      thumbnailUrl: [videoObject.pictures?.base_link ?? ''],
      uploadDate: videoObject.created_time ?? '',
      duration: videoObject.duration?.toString() ?? '',
      embedUrl: url ?? '',
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <VideoPlayer url={url} caption={caption} />
    </>
  )
}

export default VideoPlayerWrapper
