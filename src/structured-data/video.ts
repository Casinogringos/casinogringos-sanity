const getVideoStructuredData = (video: VideoObjectType) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnail.asset.url,
    uploadDate: video.publishedAt,
    duration: video.duration,
    contentUrl: video.url,
    embedUrl: video.url,
  }
}
