import { gql } from 'graphql-tag'

export const categoryFragment = gql`
  fragment CategoryFragment on Category {
    __typename
    name
    slug
    description
    uri
  }
`
