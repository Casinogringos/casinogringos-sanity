'use client'

import { usePlausible } from 'next-plausible'
import { ReactNode } from 'react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { isCurrentPath } from '@/src/lib/helpers'
import Placeholder from '@/src/components/atoms/Placeholder'

const Link = ({
  href,
  rel,
  target,
  className,
  children,
  prefetch = false,
  role,
  place,
  label,
  current,
  replace,
  plausible,
  variant,
  title,
  disabled,
}: {
  href: string
  rel?: string
  target?: string
  className?: string
  children: ReactNode
  prefetch?: boolean
  title?: string
  role?: string
  place?: string
  label?: string
  current?: string
  replace?: boolean
  plausible?: {
    eventName: string
    props: Record<string, string>
  }
  variant?: 'affiliate' | 'ghost'
  disabled?: boolean
}) => {
  const plausibleMethod = usePlausible()
  const pathname = usePathname()
  const isActive = isCurrentPath(pathname, href)
  const getClassName = () => {
    switch (variant) {
      case 'affiliate':
        return 'bg-button hover:bg-button-hover not-prose inline-block justify-center lg:text-lg text-white no-underline text-center font-semibold px-6 py-4 rounded-md'
      default:
        return `${isActive ? 'text-primary' : 'hover:text-primary'} underline`
    }
  }
  if (!href) return <Placeholder message={'Link component missing the href'} />

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
      title={title}
      onClick={() => {
        if (!plausible) return
        plausibleMethod(plausible.eventName, {
          props: { ...plausible.props, pathname },
        })
      }}
    >
      {children}
    </NextLink>
  )
}

export default Link
