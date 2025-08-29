import Date from '@/src/components/atoms/Date'
import { ArrowRightIcon, Linkedin, Mail } from 'lucide-react'
import Link from '@/src/components/atoms/Link'
import { AuthorSchemaType } from '@/src/schemas/author'
import ShareButtons from '@/src/components/molecules/ShareButtons'
import Image from 'next/image'
import Placeholder from '@/src/components/atoms/Placeholder'
import { PortableText } from 'next-sanity'

const Avatar = ({
  author,
  reviewer,
  modifiedAt,
  shareTitle,
  createdAt,
}: {
  author: AuthorSchemaType
  reviewer?: AuthorSchemaType
  modifiedAt: number | null
  shareTitle: string
  createdAt: number | null
}) => {
  console.log('modifiedAt', modifiedAt)
  console.log('createdAt', createdAt)
  const { avatar } = author
  if (!avatar) return <Placeholder message='No author avatar' />

  return (
    <>
      <div className="flex gap-x-6 border-b border-t border-gray-100 py-4 md:justify-between lg:mt-5">
        <div className="flex gap-3">
          <div className="relative">
            <Image
              src={author.avatar.src}
              width={40}
              height={40}
              className="rounded-full"
              alt={author.avatar.alt}
            />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-700">
              {author.role}
            </div>
            <div className="has-tooltip relative block w-fit items-center gap-1 text-sm">
              <Link
                className="flex w-fit text-[15px] font-medium"
                href={`/om-oss/${author.slug.current}`}
                prefetch={false}
              >
                <span>{author.firstName} {author.lastName}</span>
              </Link>
              <div className="tooltip left-1/2 mx-auto hidden min-w-96 -translate-x-1/2 rounded-md border border-slate-200 bg-gray-50 p-5 text-sm opacity-100 shadow-sm transition-opacity md:block">
                {' '}
                <div className="flex gap-4">
                  <div className="relative mt-0.5 h-12 w-12 flex-shrink-0 rounded-full">
                    <Image
                      src={author.avatar.src}
                      width={96}
                      height={96}
                      className="rounded-full"
                      alt={`${author.firstName} ${author.lastName}`}
                    />
                  </div>
                  <div>
                    <strong className="text-base text-gray-700 font-medium">{`${author.firstName} ${author.lastName}`}</strong>{' '}
                    <div className="text-xs font-medium text-slate-700">
                      {author.role}
                    </div>
                    <div className="ml-auto mt-1 flex gap-1.5">
                      {author.linkedIn && (
                        <Link
                          className="rounded-md bg-slate-200 p-1 text-slate-500"
                          href={author.linkedIn}
                          title="LinkedIn"
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                        >
                          <Linkedin className="h-4 w-4" />
                        </Link>
                      )}
                      {author.email && (
                        <Link
                          className="rounded-md bg-slate-200 p-1 text-slate-500"
                          href={`mailto:${author.email}`}
                          title="E-post"
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                        >
                          <Mail className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm font-normal text-slate-600">
                  <PortableText value={author.description} />
                </div>
                <Link
                  href={`/om-oss/${author.slug.current}`}
                  prefetch={false}
                  className="mt-4 flex items-center gap-3 text-base font-medium underline decoration-dashed"
                >
                  Läs alla artiklar av{' '}
                  {`${author.firstName} ${author.lastName}`}{' '}
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
              </div>
              {/* <CheckBadgeIcon className="h-4 w-4 text-blue400" /> */}
            </div>
          </div>
          {/* <div className="flex w-full flex-col gap-x-3 text-gray600 md:flex-row">
            {date && !modified ? (
              <div className="text-slate-600 text-xs font-medium">
                <span>Publicerad: {DateString(date)}</span>
              </div>
            ) : (
              <div className="flex items-center text-xs font-medium text-gray600">
                <span>
                  Uppdaterad:{' '}
                  <time dateTime={modified}>{DateString(modified)}</time>
                </span>
              </div>
            )}
          </div> */}
        </div>
        {reviewer && (
          <div className="text-xs">
            <span>Faktakontrollerad av</span>
            <Link
              href={`/om-oss/${reviewer.slug.current}`}
              className="block text-[15px] font-medium"
              prefetch={false}
            >
              {`${reviewer.firstName} ${reviewer.lastName}`}
            </Link>
          </div>
        )}
        <div className="mt-4 hidden text-xs md:mt-0 md:block">
          <span>{modifiedAt ? 'Uppdaterad den' : 'Publicerad den'}</span>
          <div className="text-[14px]">
            {createdAt && <Date timestamp={createdAt} />}
          </div>
        </div>
        <div className="hidden items-center gap-x-1 md:flex">
          <span className="mr-1 text-xs">Dela:</span>
          <ShareButtons title={shareTitle} />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 rounded-sm border border-gray-200 px-3 py-2.5 text-xs text-slate-700 md:mt-0 md:hidden">
        <span>Uppdaterad:</span>
        {modifiedAt && <Date timestamp={modifiedAt} />}
        <div className="ml-auto flex items-center gap-x-1 md:hidden">
          <span className="mr-1">Dela:</span>
          <ShareButtons title={shareTitle} />
        </div>
      </div>
    </>
  )
}

export default Avatar
