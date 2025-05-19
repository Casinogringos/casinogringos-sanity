import { gql } from "graphql-tag";
import {
  blockFragments,
  affiliateLinkFragment,
  seoFragment,
  mediaItemFragment,
  authorPreviewFragment,
  paymentProviderFragment,
  gameProviderFragment,
} from "@/src/data/fragments/index";

export const postFragment = gql`
  fragment PostFragment on Post {
    __typename
    id
    title
    excerpt
    uri
    slug
    date
    modified
    reviewer {
      username
      slug
      description
    }
    editorBlocks(flat: false) {
      ...BlockFragments
    }
    postType {
      description
      description2
      description3
      fordelar {
        fordel
      }
      nackdelar {
        nackdel
      }
      rating
      ratings {
        bonusRating
        bonusRatingMotivation
        gameSelectionRating
        gameSelectionRatingMotivation
        bettingRating
        bettingRatingMotivation
        supportRating
        supportRatingMotivation
        usabilityRating
        usabilityRatingMotivation
        registrationRating
        registrationRatingMotivation
        slotsRating
        slotsRatingMotivation
        liveCasinoRating
        liveCasinoRatingMotivation
        paymentProvidersRating
        paymentProvidersRatingMotivation
      }
      helhetsmotivering
      brandColor
      title
      paymentprovidersNew {
        edges {
          node {
            ...PaymentProviderFragment
          }
        }
      }
      gameprovidersNew(first: 100) {
        edges {
          node {
            ...GameProviderFragment
          }
        }
      }
      disclaimer
      brandCategories
      introduction
      kundtjanstTelefon
      brandEmail
      brandSupportHours
      affiliateLink {
        node {
          ...AffiliateLinkFragment
        }
      }
      bankId
      lanseradesDatum
      liveChat
      minInsattningValue
      svenskLicens
      swish
    }
    seo {
      ...SeoFragment
    }
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
  ${blockFragments}
  ${affiliateLinkFragment}
  ${seoFragment}
  ${mediaItemFragment}
  ${authorPreviewFragment}
  ${paymentProviderFragment}
  ${gameProviderFragment}
`;
