import { Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import BreadCrumbs from '@/src/components/organisms/BreadCrumbs'
import ModularContent from '@/src/components/organisms/ModularContent'
import SubPageHero from '@/src/components/molecules/SubPageHero'
import getArticleStructuredData from '@/src/structured-data/articleStructuredData'
import { getWebPageStructuredData } from '@/src/structured-data/webPageStructuredData'
import { getBreadcrumbListStructuredData } from '@/src/structured-data/breadcrumbListStructuredData'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'
import { getPersonStructuredData } from '@/src/structured-data/personStructuredData'
import SanityImage from '@/src/components/atoms/SanityImage'
import { PortableText } from 'next-sanity'
import { AuthorSchemaType } from '@/src/schemas/author'
import { SubPageSchemaType } from '@/src/schemas/subPage'

const AuthorIndex = ({
  page,
  authors,
}: {
  page: SubPageSchemaType
  authors: AuthorSchemaType[]
}) => {
  const breadcrumbs = [
    {
      text: 'Hem',
      url: `${process.env.SITE_URL}/`,
    },
    {
      text: 'Om Oss',
    },
  ]
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      getArticleStructuredData(page),
      getWebPageStructuredData(page),
      getBreadcrumbListStructuredData(breadcrumbs),
      getWebSiteStructuredData(),
      getOrganizationStructuredData(),
      getPersonStructuredData(page.author),
    ],
  }

  return (
    <>
      <SubPageHero page={page} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
        key="about-index-structured-data"
      />
      <BreadCrumbs items={breadcrumbs} />
      <ModularContent
        objects={page.content}
      />
      <div className="bg-hero px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl">Vi som jobbar på Casinogringos</h2>
          {authors.map((author) => (
            <div
              key={`author-${author._id}`}
              className="mb-4 rounded-md bg-white p-6"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="mt-1 overflow-hidden rounded-full">
                  <SanityImage
                    image={author.avatar}
                    width={50}
                  />
                </div>
                <div>
                  <Link prefetch={false} href={`/om-oss/${author.slug}`}>
                    <span className="block font-medium">
                      {author.firstName} {author.lastName}
                    </span>
                  </Link>
                  <span className="text-slate-500 block text-sm">
                    {author.role}
                  </span>
                </div>
                <div className="ml-auto mt-2 flex gap-2">
                  {author?.linkedIn && (
                    <Link
                      className="rounded-md bg-dark p-1 text-white"
                      href={author?.linkedIn}
                      title="LinkedIn"
                      prefetch={false}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  )}
                  {author?.email && (
                    <Link
                      className="rounded-md bg-dark p-1 text-white"
                      href={`mailto:${author?.email}`}
                      title="E-post"
                      target="_blank"
                      prefetch={false}
                      rel="nofollow noopener noreferrer"
                    >
                      <Mail className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
              <div className={'text-slate-700'}>
                <PortableText value={author.description} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default AuthorIndex