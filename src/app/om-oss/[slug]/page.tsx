import AuthorPage from '@/src/app/AuthorPage'
import { getAuthorBySlug, getStaticParams } from '@/src/lib/api'
import { AuthorSchemaType } from '@/src/schemas/author'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params
  const author: AuthorSchemaType = await getAuthorBySlug({ slug: params?.slug })
  const siteURL =
    (process.env.NEXT_PUBLIC_SITE_URL as string) + author.slug.current
  const metadata: Metadata = {
    title: author.seoTitle,
    description: author.seoDescription,
    alternates: {
      canonical: author.canonical ?? new URL(siteURL),
    },
    openGraph: {
      title: author.seoTitle,
      description: author.seoDescription,
      url: author.canonical,
      locale: 'sv_SE',
      images: [
        {
          url: author.avatar?.src,
          alt: author.firstName + ' ' + author.lastName,
          width: 1200,
          height: 630,
        },
      ],
    },
  }

  return metadata
}

export default async function AuthorItem(props: { params: Params }) {
  const params = await props.params
  const author = await getAuthorBySlug({ slug: params?.slug })
  if (!author) {
    return notFound()
  }
  return <AuthorPage author={author} />
}

export async function generateStaticParams() {
  const authors: AuthorSchemaType[] = await getStaticParams('authors')
  return authors.map(({ slug }) => ({ slug: slug.current }))
}
