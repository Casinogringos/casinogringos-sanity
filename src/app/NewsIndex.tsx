import Container from '@/src/components/layout/Container'
import Heading from '@/src/components/content/Heading'
import ArticleCard from '@/src/components/article/ArticleCard'
import { NewsPagePreviewSchemaType } from '@/src/schemas/newsPagePreview'
import NewsPageService from '@/src/services/NewsPageService'
import BreadCrumbs from '@/src/components/navigation/BreadCrumbs'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'
const newsPageService = new NewsPageService()

const NewsIndex = ({
  newsPages,
}: {
  newsPages: NewsPagePreviewSchemaType[]
}) => {
  const isValid = newsPageService.validateList(newsPages, true)
  const breadcrumbItems = [
    {
      text: 'Nyheter',
    },
  ]
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [getWebSiteStructuredData(), getOrganizationStructuredData()],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        key="news-index-structured-data"
      />
      <BreadCrumbs items={breadcrumbItems} />
      <Container className="py-6 lg:py-12">
        <Heading
          level={1}
          size={8}
          className="text-3xl font-bold"
          text={'Casinonyheter'}
        />
        <p className="mt-4 text-lg text-gray600">
          Här hittar du de senaste nyheterna gällande de nätcasinon som vi
          listar på våran sida. Vi skriver om allt från nya bonuserbjudanden
          till vilka kampanjer som för tillfället är aktiva. Nyhetsflödet
          uppdateras löpande så håll utkik på denna sidan för att inte missa
          grymma kampanjer.
        </p>
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-y-10">
          {newsPages
            .map((post) => (
              <div key={`news-${post._id}`}>
                <ArticleCard item={post} />
              </div>
            ))}
        </div>
      </Container>
    </>
  )
}

export default NewsIndex
