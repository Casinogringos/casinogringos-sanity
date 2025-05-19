import { gql } from 'graphql-tag'

export const flamingoCasinoBlockFragment = gql`
  fragment FlamingoCasinoBlockFragment on FlamingoCasino {
    __typename
    clientId
    renderedHtml
  }
`
