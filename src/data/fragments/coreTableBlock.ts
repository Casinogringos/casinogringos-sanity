import { gql } from 'graphql-tag'

export const coreTableBlockFragment = gql`
  fragment CoreTableBlockFragment on CoreTable {
    __typename
    renderedHtml
    clientId
  }
`
