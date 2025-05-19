import { gql } from "graphql-tag";
import {
  pageFragment,
  guideFragment,
  newsFragment,
  slotFragment,
  postFragment,
} from "@/src/data/fragments";

export const nodePreviewByUriQuery = () => gql`
  query nodePreviewByUriQuery($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      ... on Page {
        ...PageFragment
        preview {
          node {
            ...PageFragment
          }
        }
      }
      ... on Guide {
        ...GuideFragment
        preview {
          node {
            ...GuideFragment
          }
        }
      }
      ... on Nyhet {
        ...NewsFragment
        preview {
          node {
            ...NewsFragment
          }
        }
      }
      ... on Slot {
        ...SlotFragment
        preview {
          node {
            ...SlotFragment
          }
        }
      }
      ... on Post {
        ...PostFragment
        preview {
          node {
            ...PostFragment
          }
        }
      }
    }
  }
  ${pageFragment}
  ${guideFragment}
  ${newsFragment}
  ${slotFragment}
  ${postFragment}
`;
