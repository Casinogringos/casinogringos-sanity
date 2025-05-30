import { gql } from 'graphql-tag'
import { blockFragments } from '@/src/data/fragments/index'

export const pageFragment = gql`
  fragment PageFragment on Pages {
    slug {
      current
    }
    content {
      __typename
      ...BlockFragments
    }
    title
  }
  ${blockFragments}
`
