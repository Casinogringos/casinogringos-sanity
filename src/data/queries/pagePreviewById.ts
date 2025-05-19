import { gql } from 'graphql-tag'

export const pagePreviewByIdQuery = () => gql`
  query PagePreviewQuery($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      databaseId
      id
      uri
      status
    }
  }
`
