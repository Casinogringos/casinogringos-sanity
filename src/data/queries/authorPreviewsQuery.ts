import { authorProjection } from "@/src/data/projections";

export const authorPreviewsQuery = () =>
    `*[_type == 'authors'][0...100] {
        ${authorProjection}
    }
`
