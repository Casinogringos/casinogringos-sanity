import { gql } from "graphql-tag";
import {
  affiliateLinkFragment,
  authorPreviewFragment,
  mediaItemFragment,
} from "@/src/data/fragments/index";

export const postListItemFragment = gql`
  fragment PostListItemFragment on Post {
    __typename
    title
    id
    excerpt
    slug
    categories(first: 1000) {
      edges {
        node {
          slug
          name
        }
      }
    }
    postType {
      title
      bonus
      bonusLivecasino
      bonusSport
      bonusprocent
      freespins
      wageringFreespins
      wageringLivecasino
      wageringSportbonus
      introduction
      expertSummary
      ribbon
      rating
      ratings {
        bonusRating
        gameSelectionRating
        bettingRating
        supportRating
        usabilityRating
        registrationRating
        slotsRating
        liveCasinoRating
        paymentProvidersRating
      }
      brandColor
      disclaimer
      description
      description2
      description3
      wagering
      brandCategories
      paymentprovidersNew {
        edges {
          node {
            slug
          }
        }
      }
      lanseradesDatum
      liveChat
      minInsattningValue
      svenskLicens
      fordelar {
        fordel
      }
      nackdelar {
        nackdel
      }
      affiliateLink {
        node {
          ...AffiliateLinkFragment
        }
      }
    }
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
  ${affiliateLinkFragment}
  ${authorPreviewFragment}
  ${mediaItemFragment}
`;
