'use client'

import { usePlausible } from 'next-plausible'
import { ReactNode } from 'react'
import NextLink from 'next/link'

const Link = ({
  href,
  rel,
  target,
  className,
  children,
  prefetch,
  role,
  place,
  label,
  current,
  replace,
  plausible,
  variant,
}: {
  href: string
  rel?: string
  target?: string
  className?: string
  children: ReactNode
  prefetch?: boolean
  role?: string
  place?: string
  label?: string
  current?: string
  replace?: boolean
  plausible?: {
    eventName: string
    props: Record<string, string>
  }
  variant?: 'affiliate'
}) => {
  const plausibleMethod = usePlausible()
  const getClassName = () => {
    switch (variant) {
      case 'affiliate':
        return 'rounded-md bg-dark px-4 py-2 text-xs text-white'
      default:
        return 'rounded-md bg-button px-4 py-2 text-xs text-white'
    }
  }

  return (
    <NextLink
      role={role}
      href={href}
      rel={rel}
      replace={replace}
      target={target}
      className={`${className} ${getClassName()}`}
      prefetch={prefetch}
      aria-label={label}
      onClick={() => {
        if (!plausible) return
        plausibleMethod(plausible.eventName, {
          props: plausible.props,
        })
      }}
    >
      {children}
    </NextLink>
  )
}

export default Link
