import { SubPageSchemaType } from "@/src/schemas/subPage";

export const getFeaturedImageStructuredData = (page: SubPageSchemaType | NewsPageSchemaType) => {
  if (!page.featuredImage) return null

  const pagePath = typeof page.slug === 'string' ? page.slug : page.slug?.current || '';
  const pageUrl = `https://casinogringos.se/${pagePath}`.replace(/([^:]\/)\/+/g, '$1');

  return {
    "@type": "ImageObject",
    "@id": `${pageUrl}#primaryimage`,
    "url": page.featuredImage.src,
    "inLanguage": "sv-SE",
    ...(page.featuredImage.width && { width: page.featuredImage.width }),
    ...(page.featuredImage.height && { height: page.featuredImage.height }),
    ...(page.featuredImage.alt?.trim() && { alternateName: page.featuredImage.alt.trim() }),
    ...(page.featuredImage.caption?.trim() && { caption: page.featuredImage.caption.trim() }),
  }
}
