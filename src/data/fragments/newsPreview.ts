import { gql } from "graphql-tag";
import {
  mediaItemFragment,
  authorPreviewFragment,
} from "@/src/data/fragments/index";

export const newsPreviewFragment = gql`
  fragment NewsPreviewFragment on Nyhet {
    __typename
    id
    slug
    uri
    title
    date
    modified
    excerpt
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
