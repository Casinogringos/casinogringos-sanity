import { Breadcrumbs } from '@/src/types'
import BreadcrumbsService from '../services/BreadcrumbsService'

const breadcrumbsService = new BreadcrumbsService()

export const getBreadcrumbListStructuredData = (breadcrumbs: Breadcrumbs) => {
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