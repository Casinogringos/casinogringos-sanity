import { affLinkProjection } from '@/src/data/projections/affLinkProjection'

export const affLinkBySlugQuery = ({ slug }: { slug: string }) =>
  `*[_type == 'aff-links'][slug.current == "${slug}"][0] {
        ${affLinkProjection},
    }`
