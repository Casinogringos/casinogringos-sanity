import { slotPagePreviewProjection } from "./slotPagePreviewProjection";

export const slotListObjectProjection = `
    _key,
    _type,
    slots[] -> {
      ${slotPagePreviewProjection}
    }
`

