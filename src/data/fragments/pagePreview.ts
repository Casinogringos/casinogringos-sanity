import { gql } from "graphql-tag";
import {
  authorPreviewFragment,
  mediaItemFragment,
} from "@/src/data/fragments/index";

export const pagePreviewFragment = gql`
  fragment PagePreviewFragment on Page {
    __typename
    id
    slug
    uri
    title
    date
    modified
    author {
      node {
        ...AuthorPreviewFragment
      }
    }
    featuredImage {
      node {
        ...MediaItemFragment
      }
    }
  }
  ${mediaItemFragment}
  ${authorPreviewFragment}
`;
