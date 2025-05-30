import { gql } from 'graphql-tag'
import { postPreviewFragment } from '@/src/data/fragments'

export const postPreviewsQuery = ({
  where,
}: {
  where?: Record<string, string>
}) => {
  if (where) {
    return gql`
      query postPreviewsQuery($first: Int!, $category: String!) {
        posts(
          first: $first
          where: {
            categoryIn: $category
            orderby: { field: MENU_ORDER, order: ASC }
          }
        ) {
          edges {
            node {
              ...PostPreviewFragment
            }
          }
        }
      }
      ${postPreviewFragment}
    `
  } else {
    return gql`
      query postPreviewsQuery($first: Int!) {
        posts(first: $first) {
          edges {
            node {
              ...PostPreviewFragment
            }
          }
        }
      }
      ${postPreviewFragment}
    `
  }
}
