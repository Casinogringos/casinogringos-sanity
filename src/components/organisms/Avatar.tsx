'use client'

import Date from '@/src/components/atoms/Date'
import { ArrowRightIcon, Linkedin, Mail } from 'lucide-react'
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import InternalLink from '../../sin-bin/InternalLink'

export default function Avatar({
  author,
  reviewedBy,
  modified,
  shareTitle,
  date,
}) {
  const isAuthorHaveFullName = author?.node?.firstName && author?.node?.lastName
  const name = isAuthorHaveFullName
    ? `${author.node.firstName} ${author.node.lastName}`
    : author.node.name || null

  const url = `${process.env.SITE_URL}${usePathname()}`

  return (
    <>
      <div className="flex gap-x-6 border-b border-t border-gray100 py-4 md:justify-between lg:mt-5">
        <div className="flex gap-3">
          <div className="relative h-10 w-10 rounded-full">
            <Image
              src={author.node.avatar.url}
              width={96}
              height={96}
              className="rounded-full"
              alt={name}
            />
          </div>
          <div>
            <div className="text-xs font-medium text-slate700">
              {author?.node?.userType.role}
            </div>
            <div className="has-tooltip relative block w-fit items-center gap-1 text-sm">
              <InternalLink
                className="flex w-fit text-[15px] font-medium"
                href={author?.node?.uri}
                prefetch={false}
              >
                {name}
              </InternalLink>
              <div className="tooltip text-gray-100 left-1/2 mx-auto hidden min-w-96 -translate-x-1/2 rounded-md border border-slate200 bg-gray50 p-5 text-sm opacity-100 shadow-sm transition-opacity md:block">
                {' '}
                <div className="flex gap-4">
                  <div className="relative mt-0.5 h-12 w-12 flex-shrink-0 rounded-full">
                    <Image
                      src={author.node.avatar.url}
                      width={96}
                      height={96}
                      className="rounded-full"
                      alt={name}
                    />
                  </div>
                  <div>
                    <strong className="text-base font-medium">{name}</strong>{' '}
                    <div className="text-xs font-medium text-slate700">
                      {author?.node?.userType.role}
                    </div>
                    <div className="ml-auto mt-1 flex gap-1.5">
                      {author?.node?.seo?.social?.linkedIn && (
                        <Link
                          className="rounded-md bg-slate200 p-1 text-slate500"
                          href={author?.node.seo?.social?.linkedIn}
                          title="LinkedIn"
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                        >
                          <Linkedin className="h-4 w-4" />
                        </Link>
                      )}
                      {author?.node.userType?.email && (
                        <Link
                          className="rounded-md bg-slate200 p-1 text-slate500"
                          href={`mailto:${author?.node.userType?.email}`}
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
                <div className="mt-4 text-sm font-normal text-slate600">
                  {author?.node?.description}
                </div>
                <InternalLink
                  href={author?.node?.uri}
                  prefetch={false}
                  className="mt-4 flex items-center gap-3 text-base font-medium underline decoration-dashed"
                >
                  Läs alla artiklar av {author?.node.name}{' '}
                  <ArrowRightIcon className="h-5 w-5" />
                </InternalLink>
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
        {reviewedBy && (
          <div className="text-xs">
            <span>Faktakontrollerad av</span>
            <InternalLink
              href={`/om-oss/${reviewedBy.slug}`}
              className="block text-[15px] font-medium"
              prefetch={false}
            >
              {reviewedBy.username}
            </InternalLink>
          </div>
        )}
        <div className="mt-4 hidden text-xs md:mt-0 md:block">
          <span>{modified ? 'Uppdaterad den' : 'Publicerad den'}</span>
          <div className="text-[14px]">
            <time dateTime={modified ? modified : date}>
              <Date dateString={modified ? modified : date} />
            </time>
          </div>
        </div>
        <div className="hidden items-center gap-x-1 md:flex">
          <span className="mr-1 text-xs">Dela:</span>
          <FacebookShareButton url={url} quote={shareTitle} title={shareTitle}>
            <FacebookIcon size={24} round />
          </FacebookShareButton>
          <TwitterShareButton url={url} title={shareTitle}>
            <TwitterIcon size={24} round />
          </TwitterShareButton>
          <WhatsappShareButton url={url} title={shareTitle}>
            <WhatsappIcon size={24} round />
          </WhatsappShareButton>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 rounded-sm border border-gray200 px-3 py-2.5 text-xs text-slate700 md:mt-0 md:hidden">
        <span>Uppdaterad:</span>
        <time dateTime={modified}>
          <Date dateString={modified} />
        </time>
        <div className="ml-auto flex items-center gap-x-1 md:hidden">
          <span className="mr-1">Dela:</span>
          <FacebookShareButton url={url} quote={shareTitle} title={shareTitle}>
            <FacebookIcon size={20} round />
          </FacebookShareButton>
          <TwitterShareButton url={url} title={shareTitle}>
            <TwitterIcon size={20} round />
          </TwitterShareButton>
          <WhatsappShareButton url={url} title={shareTitle}>
            <WhatsappIcon size={20} round />
          </WhatsappShareButton>
        </div>
      </div>
    </>
  )
}
