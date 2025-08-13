import { BreadcrumbsSchemaType } from '@/src/schemas/breadcrumbs'

export const getBreadcrumbListStructuredData = (breadcrumbs: BreadcrumbsSchemaType) => {
  if (!breadcrumbs.length) return null

  return {
    "@type": "BreadcrumbList",
    "@id": "https://casinogringos.se/#breadcrumb",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.text
    }))
  }
}