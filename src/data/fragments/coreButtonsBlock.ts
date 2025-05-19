import { gql } from 'graphql-tag'

export const coreButtonsBlockFragment = gql`
  fragment CoreButtonsBlockFragment on CoreButtons {
    clientId
    __typename
    innerBlocks {
      __typename
      ... on CoreButton {
        clientId
        renderedHtml
        attributes {
          title
          url
        }
      }
    }
  }
`
