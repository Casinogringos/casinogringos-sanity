import { gql } from "graphql-tag";
import { guideFragment } from "@/src/data/fragments";

export const guideBySlugQuery = () => gql`
  query GuideBySlug($slug: ID!) {
    guide(id: $slug, idType: SLUG) {
      ...GuideFragment
    }
  }
  ${guideFragment}
`;
