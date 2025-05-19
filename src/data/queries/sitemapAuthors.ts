import { gql } from 'graphql-tag'

export const sitemapAuthorsQuery = () => gql`
  query SitemapAuthorsQuery {
    users(first: 500) {
      edges {
        node {
          slug
          seo {
            metaRobotsNoindex
          }
        }
      }
    }
  }
`
