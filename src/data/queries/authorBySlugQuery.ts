import { authorProjection } from "@/src/data/projections";

export const authorBySlugQuery = ({ slug }: { slug: string }) => `
  *[_type == 'author' && slug.current == '${slug}'] {
    ${authorProjection}
  }
`