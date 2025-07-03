import { Breadcrumbs } from '@/src/types'

export const getBreadcrumbListStructuredData = (breadcrumbs: Breadcrumbs) => {
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