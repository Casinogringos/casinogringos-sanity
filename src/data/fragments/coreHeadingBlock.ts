import { gql } from 'graphql-tag'

export const coreHeadingBlockFragment = gql`
  fragment CoreHeadingBlockFragment on CoreHeading {
    __typename
    attributes {
      heading
      className
      anchor
      cssClassName
      level
    }
  }
`
