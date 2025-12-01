import { authorProjection } from '@/src/data/projections/authorProjection'

export const authorPreviewsQuery = () =>
  `*[_type == 'authors' && !(_id match "drafts.*")][0...100] {
        ${authorProjection}
    }
`
