import { gql } from 'graphql-tag'

export const yoastFaqBlockFragment = gql`
  fragment YoastFaqBlockFragment on YoastFaqBlock {
    clientId
    __typename
    renderedHtml
  }
`
