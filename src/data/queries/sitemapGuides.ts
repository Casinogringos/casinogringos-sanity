import { gql } from 'graphql-tag'

export const sitemapGuidesQuery = () => gql`
  query SitemapGuidesQuery {
    guider(first: 500, where: { status: PUBLISH }) {
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
