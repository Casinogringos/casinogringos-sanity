import Date from '@/src/components/atoms/Date'
import { Calendar, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import CheckBadgeIcon from '@/src/components/icons/CheckBadgeIcon'
import Link from '@/src/components/atoms/Link'
import { User } from '@/src/types'
import { AuthorSchemaType } from '@/src/schemas'
import SanityImage from '@/src/components/atoms/SanityImage'

const AuthorBox = ({
  author,
  modified,
  reviewedBy,
}: {
  author: AuthorSchemaType
  modified: string
  reviewedBy: User
}) => {
  return (
    <div className="mx-auto mb-12 max-w-3xl rounded-md border border-blue100 bg-blue50 p-6">
      <div className="flex items-start gap-3">
        <div className="overflow-hidden rounded-full">
          <SanityImage
            image={author.avatar}
            width={45}
            height={45}
            alt={author?.avatar?.altText}
          />
        </div>
        <div>
          <div className="text-sm text-slate700">Innehållsansvarig:</div>
          <Link
            prefetch={false}
            href={author?.node?.uri}
            className="font-semibold"
          >
            {author?.node?.name}{' '}
            <CheckBadgeIcon className="-mt-1 inline-block h-5 w-5 text-blue500" />
          </Link>
        </div>
        <div className="ml-auto flex gap-2">
          {author?.node?.seo?.social?.linkedIn && (
            <Link
              rel="nofollow noopener noreferrer"
              target="_blank"
              aria-label={`${author?.node?.name} på LinkedIn`}
              href={author?.node?.seo?.social?.linkedIn}
              className="rounded-full bg-normal p-[8px]"
            >
              <Linkedin
                aria-label="none"
                className="h-3 w-3 flex-shrink-0 text-white"
              />
            </Link>
          )}
          {author?.node?.userType?.email && (
            <Link
              href={`mailto:${author?.node.userType?.email}`}
              aria-label={`${author?.node?.name} via e-post`}
              className="rounded-full bg-normal p-[8px]"
            >
              <Mail
                aria-label="none"
                className="h-3 w-3 flex-shrink-0 text-white"
              />
            </Link>
          )}
        </div>
      </div>
      <p className="mt-4 text-sm text-slate700">{author?.node?.description}</p>
      {author?.node?.userType?.expertise && (
        <section>
          <span className="mb-2 mt-5 block font-semibold">Expertområden</span>
          <div className="flex gap-2 rounded-md">
            {author?.node?.userType?.expertise?.map(
              (item: { title: string }, index: number) => (
                <span
                  key={`author-${author.id}-expertise-${index}`}
                  className="rounded-sm bg-dark px-2 py-1 text-sm text-white"
                >
                  {item.title}
                </span>
              )
            )}
          </div>
        </section>
      )}
      <div className="mt-5 flex flex-col lg:flex-row">
        <p className="flex items-center gap-2 text-xs text-slate700">
          <Calendar className="h-3 w-3" /> Uppdaterad:{' '}
          <Date dateString={modified} />
        </p>
        {reviewedBy && (
          <div className="mt-2 flex gap-3 text-xs text-slate700 lg:ml-auto lg:mt-0">
            <p className="text-xs">
              Faktakontrollerad av:{' '}
              <Link
                className="text-xs font-medium"
                prefetch={false}
                href={`/om-oss/${reviewedBy?.slug}`}
              >
                {reviewedBy?.username}
                <CheckBadgeIcon className="ml-1 inline-block h-4 w-4 text-blue400" />
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthorBox
