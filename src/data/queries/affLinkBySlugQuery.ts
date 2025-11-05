import { affLinkProjection } from '@/src/data/projections/affLinkProjection'
import { imageObjectProjection } from '../projections/imageObjectProjection'

export const affLinkBySlugQuery = ({ slug }: { slug: string }) =>
  `*[_type == 'aff-links'][slug.current == "${slug}"][0] {
        ${affLinkProjection},
        "referencedBy": *[references(^._id)] {
            _type,
            featuredImage {
                ${imageObjectProjection}
            }
        }
    }`
