import { gql } from "graphql-tag";
import { guideFragment } from "@/src/data/fragments";

export const guideByIdQuery = () => gql`
  query GuideById($id: ID!) {
    guide(id: $id, idType: DATABASE_ID) {
      ...GuideFragment
    }
  }
  ${guideFragment}
`;
