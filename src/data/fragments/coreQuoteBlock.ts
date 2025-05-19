import { gql } from 'graphql-tag'

export const coreQuoteBlockFragment = gql`
  fragment CoreQuoteBlockFragment on CoreQuote {
    __typename
    clientId
    renderedHtml
  }
`
