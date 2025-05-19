import { gql } from "graphql-tag";
import { slotPreviewFragment } from "@/src/data/fragments";

export const slotsPreviewQuery = () => gql`
  query SlotsPreviewQuery($first: Int) {
    slots(first: $first) {
      edges {
        node {
          ...SlotPreviewFragment
        }
      }
    }
  }
  ${slotPreviewFragment}
`;
