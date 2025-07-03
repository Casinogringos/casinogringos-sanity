import { BasePage } from '@/src/types'
import PageService from '@/src/services/PageService'
const pageService = new PageService()

const getArticleStructuredData = (page: BasePage) => {
  return {
    "@type": "Article",
    "@id": "https://casinogringos.se/#article",
    "isPartOf": {
      "@id": "https://casinogringos.se/"
    },
    "author": {
      "name": page.author.name,
      "@id": `https://casinogringos.se/#/schema/person/${page.author._id}`,
    },
    "headline": page.title,
    "datePublished": page.publishedAt,
    "dateModified": page.modifiedAt,
    "mainEntityOfPage": {
      "@id": "https://casinogringos.se/"
    },
    "wordCount": pageService.getWordCount(page),
    "publisher": {
      "@id": "https://casinogringos.se/#organization"
    },
    "image": {
      "@id": "https://casinogringos.se/#primaryimage"
    },
    "thumbnailUrl": page.featuredImage.image.asset.url,
    "inLanguage": "sv-SE"
  }
}

export default getArticleStructuredData