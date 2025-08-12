import { authorProjection } from "@/src/data/projections/authorProjection";

export const authorPreviewsQuery = () =>
    `*[_type == 'authors'][0...100] {
        ${authorProjection}
    }
`
