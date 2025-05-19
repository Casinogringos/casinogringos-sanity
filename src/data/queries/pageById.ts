import { gql } from "graphql-tag";
import { pageFragment } from "@/src/data/fragments";

export const pageByIdQuery = () => gql`
  query Page($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      ...PageFragment
    }
  }
  ${pageFragment}
`;
