import { gql } from 'graphql-tag'

export const coreEmbedBlockFragment = gql`
  fragment CoreEmbedBlockFragment on CoreEmbed {
    __typename
    renderedHtml
    attributes {
      url
      providerNameSlug
    }
  }
`
