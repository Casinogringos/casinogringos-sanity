import { gql } from 'graphql-tag'

export const flamingoEmbedBlockFragment = gql`
  fragment FlamingoEmbedBlockFragment on FlamingoEmbed {
    clientId
    __typename
    attributes {
      url
      type
      caption
    }
  }
`
