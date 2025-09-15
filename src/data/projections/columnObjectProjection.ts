import { headingObjectProjection } from "@/src/data/projections/headingObjectProjection"
import { imageObjectProjection } from "@/src/data/projections/imageObjectProjection"
import { paragraphObjectProjection } from "@/src/data/projections/paragraphObjectProjection"
import { listObjectProjection } from "@/src/data/projections/listObjectProjection"
import { buttonObjectProjection } from "@/src/data/projections/buttonObjectProjection"
import { buttonsObjectProjection } from "@/src/data/projections/buttonsObjectProjection"

export const columnObjectProjection = `
  _type == 'column-object' => {
    _type,
    _id,
    _key,
    width,
    className,
    backgroundColor,
    column[] {
        ${headingObjectProjection},
        ${imageObjectProjection},
        ${paragraphObjectProjection},
        ${listObjectProjection},
        ${buttonObjectProjection},
        ${buttonsObjectProjection},
    },
    message
  }
`
