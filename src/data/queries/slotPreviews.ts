import { gql } from "graphql-tag";
import { slotPreviewFragment } from "@/src/data/fragments";

export const slotPreviewsQuery = () => gql`
  query slotPreviewsQuery {
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
