import { gql } from 'graphql-tag'

export const headingBlockFragment = gql`
  fragment headingBlockFragment on HeadingObject {
    __typename
    text
    level
  }
`
