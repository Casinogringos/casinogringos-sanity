import { imageObjectProjection } from "@/src/data/projections/imageObjectProjection";
import { slotProjection } from "@/src/data/projections/slotProjection";
import { authorProjection } from "@/src/data/projections/authorProjection";
import { slotFeatureProjection } from "@/src/data/projections/slotFeatureProjection";

export const slotPagePreviewProjection = `
    _type,
    _id,
    _key,
    title,
    slug,
    originalPublishedAt,
    _createdAt,
    _updatedAt,
    originalModifiedAt,
    seoTitle,
    seoDescription,
    seoImage {
      ${imageObjectProjection}
    },
    canonical,
    featuredImage {
      ${imageObjectProjection}
    },
    slot-> {
      ${slotProjection}
    },
    author-> {
      ${authorProjection}
    },
`
