import gql from "graphql-tag";
import { affiliateLinkFragment } from "@/src/data/fragments";

export const allAffiliateLinksQuery = () => gql`
  query AffiliateLinksQuery {
    affiliateLinks(first: 500) {
      edges {
        node {
          ...AffiliateLinkFragment
        }
      }
    }
  }
  ${affiliateLinkFragment}
`;
