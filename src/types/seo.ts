export type Seo = {
  canonical: string
  opengraphUrl: string
  metaDesc: string
  title?: string
  opengraphType: string
  opengraphModifiedTime: string
  opengraphPublishedTime: string
  opengraphPublisher: string
  opengraphSiteName: string
  opengraphTitle: string
  opengraphImage?: {
    altText: string
    sourceUrl: string
    mediaDetails: {
      height?: string
      width?: string
    }
  }
  breadcrumbs: {
    text: string
    url: string
  }[]
  schema: {
    raw: string
  }
}
