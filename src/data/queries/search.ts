import { gql } from 'graphql-tag'

export const searchQuery = () => gql`
  query SearchQuery {
    guider(first: 1000) {
      edges {
        node {
          __typename
          slug
          title
          featuredImage {
            node {
              sourceUrl
            }
          }
          date
        }
      }
    }
    nyheter(first: 1000) {
      edges {
        node {
          __typename
          slug
          title
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
    pages(first: 1000) {
      edges {
        node {
          __typename
          slug
          title
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
    posts(first: 1000) {
      edges {
        node {
          __typename
          id
          slug
          title
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
    slots(first: 1000) {
      edges {
        node {
          __typename
          content
          slug
          title
          date
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
