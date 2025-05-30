import { gql } from 'graphql-tag'
import { pageFragment } from '@/src/data/fragments'

export const pageBySlugQuery = () => {
  return gql`
    query PageBySlugQuery($slug: String!) {
      allPages(where: { slug: { current: { eq: $slug } } }) {
        __typename
        ...PageFragment
      }
    }
    ${pageFragment}
  `
}
