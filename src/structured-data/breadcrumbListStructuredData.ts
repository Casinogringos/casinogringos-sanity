import { BreadcrumbsSchemaType } from '@/src/schemas/breadcrumbs'
import BreadcrumbsService from '@/src/services/BreadcrumbsService'

const breadcrumbsService = new BreadcrumbsService()

export const getBreadcrumbListStructuredData = (breadcrumbs: BreadcrumbsSchemaType) => {
  const isValid = breadcrumbsService.validateSchema(breadcrumbs)
  if (!isValid) return null

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