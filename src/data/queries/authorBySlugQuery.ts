import { authorProjection } from "@/src/data/projections/authorProjection";

export const authorBySlugQuery = ({ slug }: { slug: string }) => `
  *[_type == 'authors' && slug.current == '${slug}'] {
    ${authorProjection}
  }
`