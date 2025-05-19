import { gql } from 'graphql-tag'

export const flamingoImageBlockFragment = gql`
  fragment FlamingoImageBlockFragment on FlamingoImage {
    clientId
    __typename
    attributes {
      src
      alt
      width
      height
      caption
    }
  }
`
