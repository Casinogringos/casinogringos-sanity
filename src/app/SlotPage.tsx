import Image from 'next/image'
import Link from 'next/link'
import Star from '@/src/components/icons/StarIcon'
import HalfStarIcon from '@/src/components/icons/HalfStarIcon'
import ModularContent from '@/src/components/organisms/ModularContent'
import Avatar from '@/src/components/organisms/Avatar'
import BreadCrumbs from '@/src/components/organisms/BreadCrumbs'
import Container from '@/src/components/atoms/Container'
import SlotHero from '@/src/components/organisms/SlotHero'
import TableOfContents from '@/src/components/organisms/TableOfContents'
import { CasinoPagePreviewSchemaType, SlotPagePreviewSchemaType, SlotPageSchemaType } from '@/src/schemas'
import getSlotReviewStructuredData from '@/src/structured-data/slotReviewStructuredData'
import SlotPageService from '@/src/services/SlotPageService'
import CasinoPageService from '@/src/services/CasinoPageService'
import SanityImage from '@/src/components/atoms/SanityImage'
import Heading from '@/src/components/atoms/Heading'
import { PortableText } from 'next-sanity'

const slotPageService = new SlotPageService()
const casinoPageService = new CasinoPageService()

const Slot = ({ slotPage, similarSlotPages, casinoPages }: { slotPage: SlotPageSchemaType, similarSlotPages: SlotPagePreviewSchemaType[], casinoPages: CasinoPagePreviewSchemaType[] }) => {
  const isValidSlotPage = slotPageService.validatePage(slotPage)
  const isValidSimilarSlotPages = slotPageService.validateList(similarSlotPages, true)
  const isValidCasinoPages = casinoPageService.validateList(casinoPages, true)
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [getSlotReviewStructuredData({ page: slotPage })],
  }
  const headings = slotPageService.getHeadingObjects(slotPage)
  const { slot } = slotPage

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
        <SlotHero slotPage={slotPage} casinoPages={casinoPages} />
        <div className="bg-dark">
          <Container>
            <div className="flex flex-col gap-4 pb-6 pt-4 lg:flex-row lg:gap-12 lg:px-8 lg:pb-12 lg:pt-12">
              <div className="lg:mt-2 lg:w-1/4">
                {slotPage.featuredImage && (
                  <SanityImage
                    className="rounded-sm"
                    width={600}
                    image={slotPage.featuredImage.image}
                  />
                )}
              </div>
              <div className="text-white lg:w-3/4">
                {slot.rating && (
                  <div className="mt-2 flex">
                    {new Array(slot.rating).fill(null).map((_, index) => (
                      <Star
                        key={`rating-star-${index}`}
                        className="h-4 w-4 text-yellow400"
                      />
                    ))}
                    {new Array(slot.rating)
                      .fill(null)
                      .map(
                        (_, index) =>
                          slot.rating.indexOf('.') !== -1 && (
                            <HalfStarIcon
                              key={`rating-star-${index}`}
                              className="h-4 w-4 text-yellow400"
                            />
                          )
                      )}
                  </div>
                )}
                <Heading level={1} className="mb-0 mt-1 text-3xl font-bold text-white">
                  <span>{slotPage.title}</span>
                </Heading>
                <p className="text-slate300">
                  {slot.provider.name}
                </p>
                <PortableText value={slotPage.intro} />
                <section className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-md bg-normal px-4 py-3">
                    <span className="text-sm font-medium text-slate200">
                      RTP:
                    </span>
                    <div className="text-2xl font-semibold text-green500">
                      {slot.rtp}
                    </div>
                  </div>
                  <div className="rounded-md bg-normal px-4 py-3">
                    <span className="text-sm font-medium text-slate200">
                      Maxvinst:
                    </span>
                    <div className="text-2xl font-semibold text-primary">
                      {slot?.slotType?.maxvinst}
                    </div>
                  </div>
                  {slot?.slotType?.volatilitet && (
                    <div className="rounded-md bg-normal px-4 py-3">
                      <span className="text-sm font-medium text-slate200">
                        Volalitet:
                      </span>
                      <div className="text-2xl font-semibold text-primary">
                        {slot?.slotType?.volatilitet}
                      </div>
                    </div>
                  )}
                  {slot?.slotType?.vinstlinjer && (
                    <div className="rounded-md bg-normal px-4 py-3">
                      <span className="text-sm font-medium text-slate200">
                        Vinstlinjer:
                      </span>
                      <div className="text-2xl font-semibold text-primary">
                        {slot?.slotType?.vinstlinjer}
                      </div>
                    </div>
                  )}
                  {slot?.slotType?.minstaInsats && (
                    <div className="rounded-md bg-normal px-4 py-3">
                      <span className="text-sm font-medium text-slate200">
                        Minsta insats:
                      </span>
                      <div className="text-2xl font-semibold text-primary">
                        {slot?.slotType?.minstaInsats} kr
                      </div>
                    </div>
                  )}
                  {slot?.slotType?.hogstaInsats && (
                    <div className="rounded-md bg-normal px-4 py-3">
                      <span className="text-sm font-medium text-slate200">
                        Högsta insats:
                      </span>
                      <div className="text-2xl font-semibold text-primary">
                        {slot?.slotType?.hogstaInsats} kr
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </Container>
        </div>
        {slot.seo.breadcrumbs && (
          <BreadCrumbs
            items={slot?.seo?.breadcrumbs}
            index={{
              text: 'Slots',
              url: `${process.env.SITE_URL}/slots`,
            }}
          />
        )}
        <div className="mx-auto mb-10 mt-12 max-w-3xl px-4 lg:px-0">
          <Avatar
            author={slot.author}
            date={slot.date}
            modified={slot.modified}
            shareTitle={slot?.seo?.title}
            reviewedBy={null}
          />
        </div>
        {headings.length > 1 && (
          <div className={'px-4 lg:px-0'}>
            <TableOfContents headings={headings} />
          </div>
        )}
        <Content
          blocks={slot.preview ? slot.preview.editorBlocks : slot.editorBlocks}
        />
        {slot.slotType && slot.slotType.casinos && (
          <section id="spela" className="bg-normal py-12 lg:pb-16 lg:pt-20">
            <div className="mx-auto max-w-6xl px-4 text-left lg:px-8">
              <h2 className="mb-2 flex max-w-2xl items-start gap-4 text-xl font-bold text-white lg:max-w-full lg:items-center lg:text-2xl">
                Casinon där du kan spela {slot.title}
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {slot.slotType.casinos.edges.slice(0, 3).map(({ node }, i) => (
                  <div key={`casino-${node.id}`}>
                    <Casino
                      item={node}
                      hidePopup={true}
                      count={i}
                      pathname={node.slug}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        {similarSlots && (
          <section className={'bg-gray100 py-10'}>
            <Container>
              <h3 className={'mb-4 text-2xl text-gray700'}>Fler slots</h3>
              <div className={'grid grid-cols-2 gap-4 lg:grid-cols-4'}>
                {similarSlots.map(({ node }) => (
                  <Link
                    href={`/slots/${node.slug}`}
                    key={`slot-${node.id}`}
                    className={'flex flex-col'}
                  >
                    <div className={'mb-3 flex overflow-hidden rounded-md'}>
                      <Image
                        src={node.featuredImage?.node.sourceUrl}
                        alt={node.featuredImage?.node.altText}
                        style={{
                          minWidth: '100%',
                          minHeight: '100%',
                        }}
                        width={500}
                        height={300}
                        className="h-28 object-cover sm:h-48 md:h-56 lg:h-40"
                      />
                    </div>
                    <h4 className={'text-gray700'}>{node.title}</h4>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}
      </div>
    </>
  )
}

export default Slot