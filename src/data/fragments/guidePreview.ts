import { gql } from "graphql-tag";
import {
  mediaItemFragment,
  authorPreviewFragment,
} from "@/src/data/fragments/index";

export const guidePreviewFragment = gql`
  fragment GuidePreviewFragment on Guide {
    __typename
    id
    uri
    excerpt
    slug
    title
    date
    featuredImage {
      node {
        ...MediaItemFragment
      }
    }
    author {
      node {
        ...AuthorPreviewFragment
      }
    }
  }
  ${mediaItemFragment}
  ${authorPreviewFragment}
`;
