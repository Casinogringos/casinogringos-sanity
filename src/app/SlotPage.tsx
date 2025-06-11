import Image from 'next/image'
import Link from 'next/link'
import Star from '@/src/app/components/icons/StarIcon'
import StarHalf from '@/src/app/components/icons/HalfStarIcon'
import ModularContent from '@/src/app/components/organisms/ModularContent'
import Avatar from '@/src/app/components/organisms/Avatar'
import BreadCrumbs from '@/src/app/components/organisms/BreadCrumbs'
import CasinoRow from '@/src/app/components/organisms/CasinoRow'
import Container from '@/src/app/components/atoms/Container'
import SlotHero from '@/src/app/components/organisms/SlotHero'
import TableOfContents from '@/src/app/components/organisms/TableOfContents'

export default function SlotPage({ page }: { page: Page<Slot> }) {
  // const author = slot?.author?.node
  // const siteURL = process.env.SITE_URL
  // const structuredData = {
  //   '@context': 'https://schema.org/',3
  //   '@type': 'Review',
  //   itemReviewed: {
  //     '@type': 'Game',
  //     image: slot?.featuredImage?.node
  //       ? slot.featuredImage.node.sourceUrl
  //       : null,
  //     name: slot?.title,
  //   },
  //   reviewRating: {
  //     '@type': 'Rating',
  //     ratingValue: slot?.slotType?.rating,
  //     bestRating: '5',
  //     worstRating: '1',
  //   },
  //   author: {
  //     '@type': 'Person',
  //     name: author?.name,
  //     url: siteURL + author?.uri,
  //     email: author?.userType?.email,
  //     jobTitle: author?.userType?.role ? author.userType.role : 'Skribent',
  //     sameAs: author?.seo?.social?.linkedIn,
  //     image: {
  //       '@type': 'ImageObject',
  //       inLanguage: 'sv-SE',
  //       id: 'https://casinogringos.se/#/schema/person/image/',
  //       url: author?.avatar?.url,
  //       caption: author?.name,
  //     },
  //   },
  //   publisher: {
  //     '@type': 'Organization',
  //     name: 'Casinogringos',
  //     url: siteURL,
  //     sameAs: [
  //       'https://www.facebook.com/Casinogringos',
  //       'https://www.instagram.com/casinogringos/',
  //       'https://www.youtube.com/channel/UCeFbFMkDfTlLayuZmk_aXiA',
  //       'https://www.twitch.tv/casinogringos',
  //       'https://twitter.com/CasinoGringos',
  //     ],
  //   },
  //   isPartOf: [
  //     {
  //       id: `${siteURL}/#website`,
  //       '@type': 'WebSite',
  //       name: 'Casinogringos.se',
  //       url: siteURL,
  //       inLanguage: 'sv-se',
  //     },
  //   ],
  // }
  // const headings = getBlockHeadings(slot?.editorBlocks)
  // const convertedRating = parseInt(slot?.slotType?.rating)
  // const rating = slot.slotType?.rating?.toString()

  return (
    <>
      {/*<script*/}
      {/*  type="application/ld+json"*/}
      {/*  dangerouslySetInnerHTML={{*/}
      {/*    __html: JSON.stringify(structuredData),*/}
      {/*  }}*/}
      {/*  key="slot-data"*/}
      {/*/>*/}
      <div>
        {/*<SlotHero props={slot} />*/}
        {/*<div className="bg-dark">*/}
        {/*  <Container>*/}
        {/*    <div className="flex flex-col gap-4 pb-6 pt-4 lg:flex-row lg:gap-12 lg:px-8 lg:pb-12 lg:pt-12">*/}
        {/*      <div className="lg:mt-2 lg:w-1/4">*/}
        {/*        {slot?.featuredImage && (*/}
        {/*          <Image*/}
        {/*            className="rounded-sm"*/}
        {/*            width={600}*/}
        {/*            height={600}*/}
        {/*            src={slot.featuredImage.node.sourceUrl}*/}
        {/*            alt={slot.featuredImage.node.altText}*/}
        {/*          />*/}
        {/*        )}*/}
        {/*      </div>*/}
        {/*      <div className="text-white lg:w-3/4">*/}
        {/*        {rating && (*/}
        {/*          <div className="mt-2 flex">*/}
        {/*            {new Array(convertedRating).fill(null).map((_, index) => (*/}
        {/*              <Star*/}
        {/*                key={`rating-star-${index}`}*/}
        {/*                className="h-4 w-4 text-yellow400"*/}
        {/*              />*/}
        {/*            ))}*/}
        {/*            {new Array(rating)*/}
        {/*              .fill(null)*/}
        {/*              .map(*/}
        {/*                (_, index) =>*/}
        {/*                  rating.indexOf('.') !== -1 && (*/}
        {/*                    <StarHalf*/}
        {/*                      key={`rating-star-${index}`}*/}
        {/*                      className="h-4 w-4 text-yellow400"*/}
        {/*                    />*/}
        {/*                  )*/}
        {/*              )}*/}
        {/*          </div>*/}
        {/*        )}*/}
        {/*        <h1 className="mb-0 mt-1 text-3xl font-bold text-white">*/}
        {/*          {slot?.title}*/}
        {/*        </h1>*/}
        {/*        <p className="text-slate300">*/}
        {/*          {slot?.slotType?.speltillverkare?.name}*/}
        {/*        </p>*/}
        {/*        <p className="text-slate-200 mt-4">*/}
        {/*          {slot?.slotType?.introduction}*/}
        {/*        </p>*/}
        {/*        /!* <OldTable item={slot?.slotType} /> *!/*/}
        {/*        <section className="mt-6 grid grid-cols-2 gap-3">*/}
        {/*          /!* <div className="rounded-md bg-normal px-4 py-3">*/}
        {/*        <span className="text-sm font-medium text-slate200">*/}
        {/*          Lanserades:*/}
        {/*        </span>*/}
        {/*        <div className="text-2xl font-semibold text-primary">*/}
        {/*          {slot?.slotType?.lanseringsar}*/}
        {/*        </div>*/}
        {/*      </div> *!/*/}
        {/*          <div className="rounded-md bg-normal px-4 py-3">*/}
        {/*            <span className="text-sm font-medium text-slate200">*/}
        {/*              RTP:*/}
        {/*            </span>*/}
        {/*            <div className="text-2xl font-semibold text-green500">*/}
        {/*              {slot?.slotType?.rtp}*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*          <div className="rounded-md bg-normal px-4 py-3">*/}
        {/*            <span className="text-sm font-medium text-slate200">*/}
        {/*              Maxvinst:*/}
        {/*            </span>*/}
        {/*            <div className="text-2xl font-semibold text-primary">*/}
        {/*              {slot?.slotType?.maxvinst}*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*          {slot?.slotType?.volatilitet && (*/}
        {/*            <div className="rounded-md bg-normal px-4 py-3">*/}
        {/*              <span className="text-sm font-medium text-slate200">*/}
        {/*                Volalitet:*/}
        {/*              </span>*/}
        {/*              <div className="text-2xl font-semibold text-primary">*/}
        {/*                {slot?.slotType?.volatilitet}*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          )}*/}
        {/*          {slot?.slotType?.vinstlinjer && (*/}
        {/*            <div className="rounded-md bg-normal px-4 py-3">*/}
        {/*              <span className="text-sm font-medium text-slate200">*/}
        {/*                Vinstlinjer:*/}
        {/*              </span>*/}
        {/*              <div className="text-2xl font-semibold text-primary">*/}
        {/*                {slot?.slotType?.vinstlinjer}*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          )}*/}
        {/*          {slot?.slotType?.minstaInsats && (*/}
        {/*            <div className="rounded-md bg-normal px-4 py-3">*/}
        {/*              <span className="text-sm font-medium text-slate200">*/}
        {/*                Minsta insats:*/}
        {/*              </span>*/}
        {/*              <div className="text-2xl font-semibold text-primary">*/}
        {/*                {slot?.slotType?.minstaInsats} kr*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          )}*/}
        {/*          {slot?.slotType?.hogstaInsats && (*/}
        {/*            <div className="rounded-md bg-normal px-4 py-3">*/}
        {/*              <span className="text-sm font-medium text-slate200">*/}
        {/*                Högsta insats:*/}
        {/*              </span>*/}
        {/*              <div className="text-2xl font-semibold text-primary">*/}
        {/*                {slot?.slotType?.hogstaInsats} kr*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          )}*/}
        {/*        </section>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </Container>*/}
        {/*</div>*/}
        {/*{slot.seo.breadcrumbs && (*/}
        {/*  <BreadCrumbs*/}
        {/*    items={slot?.seo?.breadcrumbs}*/}
        {/*    index={{*/}
        {/*      text: 'Slots',*/}
        {/*      url: `${process.env.SITE_URL}/slots`,*/}
        {/*    }}*/}
        {/*  />*/}
        {/*)}*/}
        {/*<div className="mx-auto mb-10 mt-12 max-w-3xl px-4 lg:px-0">*/}
        {/*  <Avatar*/}
        {/*    author={slot.author}*/}
        {/*    date={slot.date}*/}
        {/*    modified={slot.modified}*/}
        {/*    shareTitle={slot?.seo?.title}*/}
        {/*    reviewedBy={null}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*{headings.length > 1 && (*/}
        {/*  <div className={'px-4 lg:px-0'}>*/}
        {/*    <TableOfContents headings={headings} />*/}
        {/*  </div>*/}
        {/*)}*/}
        <ModularContent objects={page.content} />
        {/*{slot.slotType && slot.slotType.casinos && (*/}
        {/*  <section id="spela" className="bg-normal py-12 lg:pb-16 lg:pt-20">*/}
        {/*    <div className="mx-auto max-w-6xl px-4 text-left lg:px-8">*/}
        {/*      <h2 className="mb-2 flex max-w-2xl items-start gap-4 text-xl font-bold text-white lg:max-w-full lg:items-center lg:text-2xl">*/}
        {/*        Casinon där du kan spela {slot.title}*/}
        {/*      </h2>*/}
        {/*      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">*/}
        {/*        {slot.slotType.casinos.edges.slice(0, 3).map(({ node }, i) => (*/}
        {/*          <div key={`casino-${node.id}`}>*/}
        {/*            <CasinoRow*/}
        {/*              item={node}*/}
        {/*              hidePopup={true}*/}
        {/*              count={i}*/}
        {/*              pathname={node.slug}*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*        ))}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </section>*/}
        {/*)}*/}
        {/*{similarSlots && (*/}
        {/*  <section className={'bg-gray100 py-10'}>*/}
        {/*    <Container>*/}
        {/*      <h3 className={'mb-4 text-2xl text-gray700'}>Fler slots</h3>*/}
        {/*      <div className={'grid grid-cols-2 gap-4 lg:grid-cols-4'}>*/}
        {/*        {similarSlots.map(({ node }) => (*/}
        {/*          <Link*/}
        {/*            href={`/slots/${node.slug}`}*/}
        {/*            key={`slot-${node.id}`}*/}
        {/*            className={'flex flex-col'}*/}
        {/*          >*/}
        {/*            <div className={'mb-3 flex overflow-hidden rounded-md'}>*/}
        {/*              <Image*/}
        {/*                src={node.featuredImage?.node.sourceUrl}*/}
        {/*                alt={node.featuredImage?.node.altText}*/}
        {/*                style={{*/}
        {/*                  minWidth: '100%',*/}
        {/*                  minHeight: '100%',*/}
        {/*                }}*/}
        {/*                width={500}*/}
        {/*                height={300}*/}
        {/*                className="h-28 object-cover sm:h-48 md:h-56 lg:h-40"*/}
        {/*              />*/}
        {/*            </div>*/}
        {/*            <h4 className={'text-gray700'}>{node.title}</h4>*/}
        {/*          </Link>*/}
        {/*        ))}*/}
        {/*      </div>*/}
        {/*    </Container>*/}
        {/*  </section>*/}
        {/*)}*/}
      </div>
    </>
  )
}
