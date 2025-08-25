'use client'

import Date from '@/src/components/atoms/Date'
import CheckBadge from '@/src/components/icons/CheckBadgeIcon'
import { Calendar } from 'lucide-react'
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from '@/src/components/atoms/Link'
import { AuthorSchemaType } from '@/src/schemas/author'

const HeroAvatar = ({
  author,
  date,
  modified,
  shareTitle,
}: {
  author: AuthorSchemaType
  date: string
  modified: string
  shareTitle: string
}) => {
  const url = `${process.env.SITE_URL}${usePathname()}`

  return (
    <>
      <div className="flex items-start gap-3 lg:mt-8">
        <div className="relative mt-1 flex h-11 w-11 rounded-full">
          <Image
            src={author.avatar.src}
            alt={author.avatar.alt}
            width={44}
            height={44}
            priority={true}
            className="rounded-full"
          />
        </div>
        <div>
          <Link
            className="text-sm text-slate-300"
            prefetch={false}
            href={`/om-oss/${author.slug.current}`}
          >
            <span className="flex items-center gap-1 font-medium">
              {author.firstName} {author.lastName}
              <CheckBadge className="h-4 w-4 rounded-full text-sky-400" />
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-300">
              {author.role}
            </div>
          </Link>
          <div className="flex w-full items-center gap-x-4 text-slate-400">
            {modified ? (
              <div className="mt-0.5 flex items-center gap-2 text-xs">
                <span>
                  Senast uppdaterad: <Date dateString={modified} />
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Calendar className="text-slate-200 h-4 w-4" />
                <span>
                  Publicerad: <Date dateString={date} />
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="ml-auto flex gap-2 pr-4">
          <FacebookShareButton url={url} quote={shareTitle} title={shareTitle}>
            <FacebookIcon size={26} round />
          </FacebookShareButton>
          <TwitterShareButton url={url} title={shareTitle}>
            <TwitterIcon size={26} round />
          </TwitterShareButton>
          <WhatsappShareButton url={url} title={shareTitle}>
            <WhatsappIcon size={26} round />
          </WhatsappShareButton>
        </div>
      </div>
    </>
  )
}

export default HeroAvatar
