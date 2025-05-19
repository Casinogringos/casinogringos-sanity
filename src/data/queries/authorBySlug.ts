import { gql } from "graphql-tag";
import { authorFragment } from "@/src/data/fragments";

export const authorBySlugQuery = () => gql`
  query AuthorBySlugQuery($slug: ID!) {
    user(id: $slug, idType: SLUG) {
      ...AuthorFragment
    }
  }
  ${authorFragment}
`;
