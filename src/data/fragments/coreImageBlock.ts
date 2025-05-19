import { gql } from 'graphql-tag'

export const coreImageBlockFragment = gql`
  fragment CoreImageBlockFragment on CoreImage {
    __typename
    attributes {
      url
      src
      title
      alt
    }
    mediaDetails {
      height
      width
    }
  }
`
