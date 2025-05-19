import { gql } from 'graphql-tag'

export const sitemapSlotsQuery = () => gql`
  query SiteMapSlotsQuery {
    slots(first: 500, where: { status: PUBLISH }) {
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
          content
        }
      }
    }
  }
`
