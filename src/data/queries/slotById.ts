import { gql } from "graphql-tag";
import { slotFragment } from "@/src/data/fragments";

export const slotByIdQuery = () => gql`
  query slotByIdQuery($id: ID!) {
    slot(id: $id, idType: DATABASE_ID) {
      ...SlotFragment
    }
  }
  ${slotFragment}
`;
