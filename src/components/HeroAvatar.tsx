'use client'

import Date from '@/components/Date'
import CheckBadge from '@/components/icons/CheckBadge'
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
import InternalLink from './InternalLink'
export default function HeroAvatar({ author, date, modified, shareTitle }) {
  const isAuthorHaveFullName = author?.node?.firstName && author?.node?.lastName
  const name = isAuthorHaveFullName
    ? `${author.node.firstName} ${author.node.lastName}`
    : author.node.name || null

  const url = `${process.env.SITE_URL}${usePathname()}`

  return (
    <>
      <div className="flex items-start gap-3 lg:mt-8">
        <div className="relative mt-1 flex h-11 w-11 rounded-full">
          <Image
            src={author.node.avatar.url}
            width={50}
            height={50}
            priority={true}
            className="rounded-full"
            alt={name}
          />
        </div>
        <div>
          <InternalLink
            className="text-sm text-slate300"
            prefetch={false}
            href={author.node.uri}
          >
            <span className="flex items-center gap-1 font-medium">
              {name} <CheckBadge className="h-4 w-4 rounded-full text-sky400" />
            </span>
            <div className="flex items-center gap-1 text-xs text-slate300">
              {author?.node.userType.role}
            </div>
          </InternalLink>
          <div className="flex w-full items-center gap-x-4 text-slate400">
            {modified ? (
              <div className="mt-0.5 flex items-center gap-2 text-xs">
                <span>
                  Senast uppdaterad: <Date dateString={modified} />
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-medium text-slate400">
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
