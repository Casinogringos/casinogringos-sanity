import { gql } from 'graphql-tag'

export const slotPreviewByIdQuery = () => gql`
  query SlotPreviewQuery($id: ID!) {
    slot(id: $id, idType: DATABASE_ID) {
      databaseId
      uri
      status
    }
  }
`
