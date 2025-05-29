'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { removeFirstSlash } from '../lib/helpers'

type AriaCurrentValues =
  | 'page'
  | 'step'
  | 'location'
  | 'date'
  | 'time'
  | undefined

type InternalLinkProps = {
  children?: ReactNode
  href: string
  replace?: boolean
  scroll?: boolean
  prefetch?: boolean
  className?: string
  itemProp?: string
  itemType?: string
  role?: string
  current?: AriaCurrentValues
  label?: string
  target?: string
  rel?: string
  onClick?: () => void
}

const InternalLink = ({
  children,
  href,
  replace,
  current,
  scroll,
  prefetch = true,
  className,
  itemProp,
  itemType,
  role,
  target,
  rel,
  label,
  onClick,
}: InternalLinkProps) => {
  return (
    <Link
      href={`/${removeFirstSlash(href)}`}
      replace={replace}
      scroll={scroll}
      prefetch={prefetch}
      className={className}
      itemProp={itemProp}
      itemType={itemType}
      aria-label={label}
      aria-current={current}
      role={role}
      target={target}
      rel={rel}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

export default InternalLink
