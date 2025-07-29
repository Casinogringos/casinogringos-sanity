import Container from '@/src/components/atoms/Container'
import Heading from '@/src/components/atoms/Heading'
import ArticleCard from '@/src/components/molecules/ArticleCard'
import { NewsPagePreviewSchemaType } from '@/src/schemas'
import NewsPageService from '@/src/services/NewsPageService'
import BreadCrumbs from '@/src/components/organisms/BreadCrumbs'
const newsPageService = new NewsPageService()

const NewsIndex = ({
  newsPages,
}: {
  newsPages: NewsPagePreviewSchemaType[]
}) => {
  const isValid = newsPageService.validateList(newsPages, true)
  const breadcrumbItems = [
    {
      text: 'Hem',
      url: `${process.env.SITE_URL}/`,
    },
    {
      text: 'Nyheter',
      url: `${process.env.SITE_URL}/nyheter`,
    },
  ]

  return (
    <>
      <BreadCrumbs items={breadcrumbItems} />
      <Container className="py-6 lg:py-12">
        <Heading
          level={1}
          className="text-3xl font-bold"
          text={'Casinonyheter'}
        />
        <p className="mt-4 text-lg text-gray600">
          Här hittar du de senaste nyheterna gällande de nätcasinon som vi listar
          på våran sida. Vi skriver om allt från nya bonuserbjudanden till vilka
          kampanjer som för tillfället är aktiva. Nyhetsflödet uppdateras löpande
          så håll utkik på denna sidan för att inte missa grymma kampanjer.
        </p>
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-y-10">
          {newsPages.map((post) => (
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
