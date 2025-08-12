import { authorProjection } from "@/src/data/projections/authorProjection";

export const authorBySlugQuery = ({ slug }: { slug: string }) => `
  *[_type == 'author' && slug.current == '${slug}'] {
    ${authorProjection}
  }
`