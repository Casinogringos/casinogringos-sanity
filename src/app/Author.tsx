import Date from '@/src/components/atoms/Date'
import Link from '@/src/components/atoms/Link'
import { Linkedin, Mail } from "lucide-react";
import BreadCrumbs from '@/src/components/organisms/BreadCrumbs'
import Container from '@/src/components/atoms/Container'
import { Author as AuthorType, Breadcrumbs } from '@/src/types'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'
import { getPersonStructuredData } from '@/src/structured-data/personStructuredData'
import getProfileStructuredData from '@/src/structured-data/profileStructuredData'
import SanityImage from '@/src/components/atoms/SanityImage'
import { PortableText } from 'next-sanity'

const Author = ({ author, breadcrumbs }: { author: AuthorType; breadcrumbs: Breadcrumbs }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      getProfileStructuredData(author),
      getWebSiteStructuredData(),
      getOrganizationStructuredData(),
      getPersonStructuredData(author),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
        key="homepage-data"
      />
      <div className="bg-blue50 py-6 lg:py-16">
        <Container>
          <div className="flex flex-col items-start gap-10 lg:flex-row">
            <div className="overflow-hidden rounded-full lg:w-1/5">
              <SanityImage image={author.avatar.image} altText={author.name} width={400} />
            </div>
            <div className="lg:w-3/4">
              <h1 className="mb-1 text-3xl font-bold">{author.name}</h1>
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
                <PortableText value={author.about} />
              </div>
              {author.expertise && (
                <section>
                  <h3 className="mb-4 mt-5 text-lg">Expertområden</h3>
                  <div className="flex gap-2 rounded-md">
                    {author.expertise?.map((item, index) => (
                      <span
                        key={`author-${author._key}-expertise-${index}`}
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
                  <h3 className="mb-3 mt-5 text-lg">
                    Erfarenhet och utbildning
                  </h3>
                  <ul>
                    {author.experience?.map((item, index) => (
                      <li
                        key={`author-${author._key}-experience-${index}`}
                        className="border-b border-b-blue100 py-2"
                      >
                        <strong className="text-dark">{item.title}</strong>
                        <span className="block text-sm">{item.years}</span>
                      </li>
                    ))}
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
            <h2 className="my-10 text-3xl">
              Artiklar som författaren bidgragit till
            </h2>
            {/* <h3 className="mb-4 text-2xl">Senaste artiklar och recensioner</h3> */}
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {author.news.map((item, index) => (
                <Link
                  key={`author-${author._key}-post-${index}`}
                  className="font-medium no-underline"
                  href={`/nyheter/${item.slug.current}`}
                  prefetch={false}
                >
                  <SanityImage
                    image={item.featuredImage.image}
                    width={600}
                    altText={item.title}
                    className="h-32 w-full rounded-sm object-cover lg:h-36"
                  />
                  <div>
                    <h3 className="mb-1 mt-3 text-lg">{item?.title}</h3>
                    <span className="block text-xs text-slate600">
                      <Date dateString={item.publishedAt} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          {/* <section>
            <h2 className="mb-4 text-2xl">Senaste sidor</h2>
            <ul>
              {author?.pages?.nodes.map((item) => (
                <li key={`author-${item.id}`}>
                  <InternalLink
                    className="decoration-transparent font-medium"
                    href={item?.uri}
                    prefetch={false}
                  >
                    {item?.title}
                  </InternalLink>
                </li>
              ))}
            </ul>
          </section> */}
        </div>
      </Container>
    </>
  );
}

export default Author