import { gql } from 'graphql-tag'

export const coreListBlockFragment = gql`
  fragment CoreListBlockFragment on CoreList {
    clientId
    __typename
    renderedHtml
  }
`
