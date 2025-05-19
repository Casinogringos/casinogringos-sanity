import { gql } from "graphql-tag";
import {
  pageFragment,
  guideFragment,
  newsFragment,
  slotFragment,
  postFragment,
  affiliateLinkFragment,
} from "@/src/data/fragments";

export const nodeByIdQuery = () => gql`
  query NodeByIdQuery($id: ID!) {
    node(id: $id) {
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
