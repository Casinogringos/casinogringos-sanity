import { gql } from 'graphql-tag'

export const sitemapPagesQuery = () => gql`
  query SitemapPagesQuery {
    pages(first: 500, where: { status: PUBLISH }) {
      edges {
        node {
          title
          uri
          modified
          isFrontPage
          featuredImage {
            node {
              sourceUrl
            }
          }
          content
        }
      }
    }
  }
`
