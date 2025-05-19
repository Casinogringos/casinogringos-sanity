import { gql } from "graphql-tag";
import { slotPreviewFragment } from "@/src/data/fragments";

export const allSlotPreviewsQuery = () => gql`
  query AllSlotPreviewsQuery {
    slots(first: 1000) {
      edges {
        node {
          ...SlotPreviewFragment
        }
      }
    }
  }
  ${slotPreviewFragment}
`;
