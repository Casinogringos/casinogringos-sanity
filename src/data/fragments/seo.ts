import { gql } from 'graphql-tag'

export const seoFragment = gql`
  fragment SeoFragment on PostTypeSEO {
    canonical
    opengraphUrl
    metaDesc
    title
    opengraphType
    opengraphModifiedTime
    opengraphPublishedTime
    opengraphPublisher
    opengraphSiteName
    opengraphTitle
    opengraphImage {
      altText
      sourceUrl
      mediaDetails {
        height
        width
      }
    }
    breadcrumbs {
      text
      url
    }
    schema {
      raw
    }
  }
`
