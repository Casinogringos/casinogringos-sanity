import { gql } from 'graphql-tag'

export const sitemapPostsQuery = () => gql`
  query SitemapPostsQuery {
    posts(first: 500, where: { status: PUBLISH }) {
      edges {
        node {
          title
          slug
          modified
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`
