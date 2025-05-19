import { gql } from "graphql-tag";
import { mediaItemFragment } from "@/src/data/fragments/index";

export const slotPreviewFragment = gql`
  fragment SlotPreviewFragment on Slot {
    __typename
    id
    uri
    slug
    date
    title
    featuredImage {
      node {
        ...MediaItemFragment
      }
    }
    slotType {
      speltillverkare {
        edges {
          node {
            name
          }
        }
      }
    }
  }
  ${mediaItemFragment}
`;
