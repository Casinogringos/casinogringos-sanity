import { gql } from "graphql-tag";
import {
  mediaItemFragment,
  affiliateLinkFragment,
} from "@/src/data/fragments/index";

export const postPreviewFragment = gql`
  fragment PostPreviewFragment on Post {
    __typename
    slug
    title
    uri
    date
    modified
    id
    featuredImage {
      node {
        ...MediaItemFragment
      }
    }
    postType {
      title
      affiliateLink {
        node {
          ...AffiliateLinkFragment
        }
      }
    }
  }
  ${affiliateLinkFragment}
  ${mediaItemFragment}
`;
