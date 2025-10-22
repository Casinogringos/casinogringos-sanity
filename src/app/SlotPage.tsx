import Link from 'next/link'
import Star from '@/src/components/icons/StarIcon'
import HalfStarIcon from '@/src/components/icons/HalfStarIcon'
import ModularContent from '@/src/components/content/ModularContent'
import Avatar from '@/src/components/content/Avatar'
import BreadCrumbs from '@/src/components/navigation/BreadCrumbs'
import Container from '@/src/components/layout/Container'
import SlotHero from '@/src/components/slot/SlotHero'
import TableOfContents from '@/src/components/navigation/TableOfContents'
import { SlotPageSchemaType } from '@/src/schemas/slotPage'
import { SlotPagePreviewSchemaType } from '@/src/schemas/slotPagePreview'
import getSlotReviewStructuredData from '@/src/structured-data/slotReviewStructuredData'
import SlotPageService from '@/src/services/SlotPageService'
import CasinoPageService from '@/src/services/CasinoPageService'
import Image from 'next/image'
import Heading from '@/src/components/content/Heading'
import { PortableText } from 'next-sanity'
import CasinoCard from '@/src/components/casino/CasinoCard'
import { getWebPageStructuredData } from '@/src/structured-data/webPageStructuredData'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'
import SlotCard from '@/src/components/slot/SlotCard'
import { HeadingObjectSchemaType } from '../schemas/headingObject'
import { slugify } from '../lib/helpers'
import Placeholder from '../components/utils/Placeholder'
import { getFeaturedImageStructuredData } from '../structured-data/featuredImageStructuredData'
import getReviewStructuredData from '../structured-data/reviewStructuredData'
import getGameStructuredData from '../structured-data/gameStructuredData'

const slotPageService = new SlotPageService()
const casinoPageService = new CasinoPageService()

const SlotPage = ({
  slotPage,
  similarSlotPages,
}: {
  slotPage: SlotPageSchemaType
  similarSlotPages: SlotPagePreviewSchemaType[]
}) => {
  const isValidSlotPage = slotPageService.validatePage(slotPage)
  const isValidSimilarSlotPages = slotPageService.validateList(
    similarSlotPages,
    true
  )
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      getWebPageStructuredData(slotPage),
      getFeaturedImageStructuredData(slotPage),
      getSlotReviewStructuredData({ page: slotPage }),
      getGameStructuredData(slotPage),
      getReviewStructuredData({ reviewPage: slotPage }),
      getWebSiteStructuredData(),
      getOrganizationStructuredData(),
    ],
  }
  const headings = slotPageService.getHeadingObjects(slotPage)
  const { slot } = slotPage
  if (!slot) return (
    <Placeholder message="No slot attached to slot page" />
  )
  const breadcrumbs = [
    {
      text: 'Slots',
      url: `${process.env.SITE_URL}/slots`,
    },
    {
      text: slotPage.title,
    },
  ]
  const createdAt =
    new Date(slotPage.originalPublishedAt ?? ('' as string)).getTime() ??
    new Date(slotPage._createdAt).getTime()
  const modifiedAt =
    new Date(slotPage._updatedAt).getTime() ??
    new Date(slotPage.originalModifiedAt ?? ('' as string)).getTime()
  const { casinos, latestCasinos } = slotPage
  const relatedCasinos = casinos?.length > 0 ? casinos : latestCasinos
  const slotVolatilityMap = {
    low: 'Låg',
    medium: 'Medium',
    high: 'Hög',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
        key="slot-data"
      />
      <div>
        <SlotHero slotPage={slotPage} />
        <div className="bg-dark">
          <Container>
            <div className="flex flex-col gap-4 pb-6 pt-4 lg:flex-row lg:gap-12 lg:px-8 lg:pb-12 lg:pt-12">
              <div className="lg:mt-2 lg:w-1/4">
                {slotPage.featuredImage && (
                  <Image
                    className="rounded-sm"
                    width={600}
                    height={600}
                    src={slotPage.featuredImage.src}
                    alt={slotPage.featuredImage.alt}
                  />
                )}
              </div>
              <div className="text-white lg:w-3/4">
                {slot.rating && (
                  <div className="mt-2 flex">
                    {new Array(slot.rating).fill(null).map((_, index) => (
                      <Star
                        key={`rating-star-${index}`}
                        className="h-4 w-4 text-yellow-400"
                      />
                    ))}
                    {new Array(slot.rating)
                      .fill(null)
                      .map(
                        (_, index) =>
                          slot.rating.toString().indexOf('.') !== -1 && (
                            <HalfStarIcon
                              key={`rating-star-${index}`}
                              className="h-4 w-4 text-yellow-400"
                            />
                          )
                      )}
                  </div>
                )}
                <Heading
                  level={1}
                  sizes={[6, 6, 7]}
                  text={slotPage.title}
                  className="mb-0 mt-1 font-bold text-white"
                />
                <p className="text-slate-300 mb-5">{slot.provider.name}</p>
                <PortableText value={slotPage.intro} />
                <section className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-md bg-normal px-4 py-3 bg-white/10">
                    <span className="text-sm font-medium text-slate-200">
                      RTP:
                    </span>
                    <div className="text-2xl font-semibold text-green-500">
                      {slot.rtpRange[0]} - {slot.rtpRange[1]}
                    </div>
                  </div>
                  <div className="rounded-md bg-normal px-4 py-3 bg-white/10">
                    <span className="text-sm font-medium text-slate-200">
                      Maxvinst:
                    </span>
                    <div className="text-2xl font-semibold text-primary">
                      {slot.maxWin}
                    </div>
                  </div>
                  {slot.volatility && (
                    <div className="rounded-md bg-normal px-4 py-3 bg-white/10">
                      <span className="text-sm font-medium text-slate-200">
                        Volalitet:
                      </span>
                      <div className="text-2xl font-semibold text-primary">
                        {
                          slotVolatilityMap[
                          slot.volatility as keyof typeof slotVolatilityMap
                          ]
                        }
                      </div>
                    </div>
                  )}
                  {slot.numberOfPaylines ? (
                    <div className="rounded-md bg-normal px-4 py-3 bg-white/10">
                      <span className="text-sm font-medium text-slate-200">
                        Vinstlinjer:
                      </span>
                      <div className="text-2xl font-semibold text-primary">
                        {slot.numberOfPaylines}
                      </div>
                    </div>
                  ) : null}
                  {slot.minBet && (
                    <div className="rounded-md bg-normal px-4 py-3 bg-white/10">
                      <span className="text-sm font-medium text-slate-200">
                        Minsta insats:
                      </span>
                      <div className="text-2xl font-semibold text-primary">
                        {slot.minBet} kr
                      </div>
                    </div>
                  )}
                  {slot.maxBet && (
                    <div className="rounded-md bg-normal px-4 py-3 bg-white/10">
                      <span className="text-sm font-medium text-slate-200">
                        Högsta insats:
                      </span>
                      <div className="text-2xl font-semibold text-primary">
                        {slot.maxBet} kr
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </Container>
        </div>
        {breadcrumbs && <BreadCrumbs items={breadcrumbs} narrow />}
        <Container narrow className="mb-10 mt-12">
          <Avatar
            author={slotPage.author}
            createdAt={createdAt}
            modifiedAt={modifiedAt}
            shareTitle={slotPage.seoTitle}
            reviewer={slotPage.reviewer}
          />
        </Container>
        {headings.length > 1 && (
          <Container narrow>
            <TableOfContents
              headings={headings.map((heading: HeadingObjectSchemaType) => ({
                text: heading.text,
                slug: `${slotPage.slug.current}#${slugify(heading.text)}`,
              }))}
            />
          </Container>
        )}
        <ModularContent className="py-5" objects={slotPage.content} narrow />
        {relatedCasinos.filter((casino) => casino.casino) && (
          <section id="spela" className="bg-dark  py-12 lg:pb-16 lg:pt-20">
            <div className="mx-auto max-w-6xl px-4 text-left lg:px-8">
              <h2 className="mb-2 flex max-w-2xl items-start gap-4 text-xl font-bold text-white lg:max-w-full lg:items-center lg:text-2xl">
                Casinon där du kan spela {slotPage.slot.name}
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {relatedCasinos.slice(0, 3).map((casino, i) => (
                  <div key={`casino-${casino._id}`}>
                    <CasinoCard casinoPage={casino} index={i} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        {similarSlotPages && (
          <section className={'bg-gray-100 py-10'}>
            <Container>
              <Heading
                level={3}
                sizes={[6, 6, 7]}
                className={'mb-4 text-gray-700 font-bold'}
                text="Fler slots"
              />
              <div className={'grid grid-cols-2 gap-4 lg:grid-cols-4'}>
                {similarSlotPages.map((page) => (
                  <SlotCard key={`slot-${page._id}`} slotPage={page} />
                ))}
              </div>
            </Container>
          </section>
        )}
      </div>
    </>
  )
}

export default SlotPage
