import { gql } from "graphql-tag";
import {
  blockFragments,
  mediaItemFragment,
  seoFragment,
  postListItemFragment,
  authorPreviewFragment,
} from "@/src/data/fragments/index";

export const slotFragment = gql`
  fragment SlotFragment on Slot {
    __typename
    id
    slug
    uri
    title
    editorBlocks {
      ...BlockFragments
    }
    featuredImage {
      node {
        ...MediaItemFragment
      }
    }
    seo {
      ...SeoFragment
    }
    date
    modified
    slotType {
      rtp
      lanseringsar
      maxvinst
      vinstlinjer
      volatilitet
      minstaInsats
      hogstaInsats
      demoUrl
      rating
      introduction
      speltillverkare {
        edges {
          node {
            name
          }
        }
      }
      casinos {
        edges {
          node {
            ...PostListItemFragment
          }
        }
      }
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
  ${postListItemFragment}
  ${authorPreviewFragment}
`;
