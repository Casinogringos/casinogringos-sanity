import gql from 'graphql-tag'

export const mediaItemFragment = gql`
  fragment MediaItemFragment on MediaItem {
    __typename
    id
    sourceUrl
    altText
    mediaDetails {
      width
      height
    }
  }
`
