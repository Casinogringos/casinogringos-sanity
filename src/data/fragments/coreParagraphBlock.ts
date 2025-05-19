import { gql } from 'graphql-tag'

export const coreParagraphBlockFragment = gql`
  fragment CoreParagraphBlockFragment on CoreParagraph {
    clientId
    __typename
    attributes {
      content
      className
    }
  }
`
