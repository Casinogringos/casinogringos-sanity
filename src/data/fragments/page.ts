import { gql } from "graphql-tag";
import {
  blockFragments,
  seoFragment,
  authorPreviewFragment,
  pageInfoFragment,
} from "@/src/data/fragments/index";

export const pageFragment = gql`
  fragment PageFragment on Page {
    slug
    uri
    id
    menuOrder
    editorBlocks(flat: false) {
      ...BlockFragments
    }
    title
    modified
    date
    seo {
      ...SeoFragment
    }
    reviewer {
      username
      slug
    }
    author {
      node {
        ...AuthorPreviewFragment
      }
    }
    pageType {
      ...PageInfoFragment
      faqSubtitle
      faq {
        faqSection {
          faqAnswer
          faqQuestion
        }
      }
    }
    children {
      edges {
        node {
          id
          slug
          uri
          ... on Page {
            id
            title
          }
        }
      }
    }
    parent {
      node {
        id
        slug
        uri
        ... on Page {
          title
        }
      }
    }
  }
  ${blockFragments}
  ${seoFragment}
  ${authorPreviewFragment}
  ${pageInfoFragment}
`;
