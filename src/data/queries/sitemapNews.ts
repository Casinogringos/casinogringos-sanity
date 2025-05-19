import { gql } from 'graphql-tag'

export const sitemapNewsQuery = () => gql`
  query SitemapNewsQuery {
    nyheter(first: 500, where: { status: PUBLISH }) {
      edges {
        node {
          title
          date
          slug
          modified
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
