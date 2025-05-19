import gql from "graphql-tag";
import { mediaItemFragment } from "@/src/data/fragments/mediaItem";

export const affiliateLinkFragment = gql`
  fragment AffiliateLinkFragment on AffiliateLink {
    __typename
    id
    title
    slug
    affiliateLinkType {
      affiliateUrl
      logoForOperator {
        node {
          ...MediaItemFragment
        }
      }
    }
  }
  ${mediaItemFragment}
`;
