import { gql } from "graphql-tag";
import {
  pageFragment,
  guideFragment,
  newsFragment,
  slotFragment,
  postFragment,
  affiliateLinkFragment,
} from "@/src/data/fragments";

export const nodeByUriQuery = () => {
  return gql`
    query NodeByUriQuery($uri: String!) {
      nodeByUri(uri: $uri) {
        __typename
        ...PageFragment
        ...GuideFragment
        ...NewsFragment
        ...SlotFragment
        ...PostFragment
        ...AffiliateLinkFragment
      }
    }
    ${pageFragment}
    ${guideFragment}
    ${newsFragment}
    ${slotFragment}
    ${postFragment}
    ${affiliateLinkFragment}
  `;
};
