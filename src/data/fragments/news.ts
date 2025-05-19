import { gql } from "graphql-tag";
import {
  blockFragments,
  mediaItemFragment,
  seoFragment,
  authorPreviewFragment,
} from "@/src/data/fragments/index";

export const newsFragment = gql`
  fragment NewsFragment on Nyhet {
    __typename
    id
    slug
    uri
    title
    editorBlocks(flat: false) {
      ...BlockFragments
    }
    date
    modified
    featuredImage {
      node {
        ...MediaItemFragment
      }
    }
    reviewer {
      username
      slug
    }
    seo {
      ...SeoFragment
    }
    author {
      node {
        ...AuthorPreviewFragment
      }
    }
  }
  ${blockFragments}
  ${mediaItemFragment}
  ${seoFragment}
  ${authorPreviewFragment}
`;
