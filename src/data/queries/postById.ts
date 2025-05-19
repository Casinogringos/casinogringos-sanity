import { gql } from "graphql-tag";
import { postFragment } from "@/src/data/fragments";

export const postByIdQuery = () => gql`
  query postByIdQuery($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      ...PostFragment
    }
  }
  ${postFragment}
`;
