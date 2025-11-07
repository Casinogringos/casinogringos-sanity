import DateComponent from '@/src/components/content/Date'
import Link from '@/src/components/content/Link'
import { Linkedin, Mail } from 'lucide-react'
import BreadCrumbs from '@/src/components/navigation/BreadCrumbs'
import Container from '@/src/components/layout/Container'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'
import { getPersonStructuredData } from '@/src/structured-data/personStructuredData'
import getProfileStructuredData from '@/src/structured-data/profileStructuredData'
import { PortableText } from 'next-sanity'
import { AuthorSchemaType } from '@/src/schemas/author'
import Image from 'next/image'
import Heading from '@/src/components/content/Heading'
import ArticleCard from '../components/article/ArticleCard'

const Author = ({ author }: { author: AuthorSchemaType }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      getProfileStructuredData(author),
      getWebSiteStructuredData(),
      getOrganizationStructuredData(),
      getPersonStructuredData(author),
    ],
  }
  const breadcrumbs = [
    {
      text: 'Om Oss',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/om-oss`,
    },
    {
      text: author.firstName + ' ' + author.lastName,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/om-oss${author.slug.current}`,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
        key="homepage-data"
      />
      <div className="bg-blue-50 py-6 lg:py-16 not-prose">
        <Container>
          <div className="flex flex-col items-start gap-10 lg:flex-row">
            <div className="overflow-hidden rounded-full lg:w-1/5">
              <Image
                src={author.avatar.src}
                alt={author.avatar.alt}
                width={400}
                height={400}
              />
            </div>
            <div className="lg:w-3/4">
              <Heading
                level={1}
                sizes={[5, 5, 6]}
                text={author.firstName + ' ' + author.lastName}
                className="mb-1 font-bold"
              />
              <span className="text-slate-600">{author.role}</span>
              <div className="ml-auto mt-2 flex gap-2">
                {author.linkedIn && (
                  <Link
                    className="rounded-md bg-dark p-1 text-white"
                    href={author.linkedIn}
                    title="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                )}
                {author.email && (
                  <Link
                    className="rounded-md bg-dark p-1 text-white"
                    href={`mailto:${author.email}`}
                    title="E-post"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Mail className="h-4 w-4" />
                  </Link>
                )}
              </div>
              <div className={'text-slate-700 mt-6'}>
                <PortableText value={author.description} />
              </div>
              {author.expertise && (
                <section>
                  <Heading
                    level={3}
                    sizes={[4, 4, 5]}
                    className="mb-3 mt-5 font-bold"
                    text="Expertområden"
                  />
                  <div className="flex gap-2 rounded-md">
                    {author.expertise?.map((item, index) => (
                      <span
                        key={`author-${author._id}-expertise-${index}`}
                        className="rounded-sm bg-dark px-2 py-1 text-sm text-white"
                      >
                        {item.title}
                      </span>
                    ))}
                  </div>
                </section>
              )}
              {author.experience && (
                <section>
                  <Heading
                    level={3}
                    sizes={[4, 4, 5]}
                    className="mt-5 font-bold"
                    text="Erfarenhet och utbildning"
                  />
                  <ul>
                    {author.experience?.map((item, index) => {
                      const startDate = new Date(item.startDate).getTime()
                      const endDate = item.endDate
                        ? new Date(item.endDate).getTime()
                        : startDate
                      return (
                        <li
                          key={`author-${author._id}-experience-${index}`}
                          className="border-b border-b-blue-100 py-2"
                        >
                          <strong className="text-dark">
                            {item.position} - {item.employer}
                          </strong>
                          <span className="block text-sm">
                            <DateComponent timestamp={startDate} /> -{' '}
                            {item.endDate ? (
                              <DateComponent timestamp={endDate} />
                            ) : (
                              'Present'
                            )}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </Container>
      </div>
      {breadcrumbs && <BreadCrumbs items={breadcrumbs} />}
      <Container>
        <div className="prose mx-auto max-w-6xl pb-12">
          <section>
            <Heading
              level={2}
              sizes={[6, 6, 7]}
              text="Artiklar som författaren bidgragit till"
            />
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {author.newsPagePreviews.map((item, index) => (
                <ArticleCard
                  key={`author-${author._id}-news-${index}`}
                  item={item}
                  excerpt={false}
                />
              ))}
            </div>
          </section>
          <section>
            <Heading level={2} sizes={[6, 6, 7]} text="Senaste sidor" />
            <ul>
              {author.pagePreviews?.map((item) => (
                <li key={`author-page-${item._id}`}>
                  <Link
                    className="decoration-transparent font-medium"
                    href={item?.slug.current}
                    prefetch={false}
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>
    </>
  )
}

export default Author
