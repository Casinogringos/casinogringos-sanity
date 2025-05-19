import { gql } from "graphql-tag";
import {
  blockFragments,
  mediaItemFragment,
  seoFragment,
  authorFragment,
} from "@/src/data/fragments/index";

export const guideFragment = gql`
  fragment GuideFragment on Guide {
    __typename
    id
    slug
    uri
    title
    editorBlocks(flat: false) {
      __typename
      ...BlockFragments
    }
    featuredImage {
      node {
        ...MediaItemFragment
      }
    }
    date
    modified
    reviewer {
      username
      slug
      description
    }
    seo {
      ...SeoFragment
    }
    author {
      node {
        ...AuthorFragment
      }
    }
  }
  ${blockFragments}
  ${mediaItemFragment}
  ${authorFragment}
  ${seoFragment}
`;
