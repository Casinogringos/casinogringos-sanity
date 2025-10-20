import { SubPageSchemaType } from "@/src/schemas/subPage"

export const getFeaturedImageStructuredData = (page: SubPageSchemaType | NewsPageSchemaType) => {
  if (!page.featuredImage) return null

  return {
    "@type": "ImageObject",
    "@id": "https://casinogringos.se/nya-casinon#primaryimage",
    "url": page.featuredImage.src,
    "width": 512,
    "height": 512,
    "caption": "Nya casinon",
    "inLanguage": "sv-SE"
  }
}
