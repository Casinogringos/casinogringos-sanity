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
}) => {
  return (
    <NextLink
      role={role}
      href={href}
      rel={rel}
      replace={replace}
      target={target}
      className={className}
      prefetch={prefetch}
      aria-label={label}
    >
      {children}
    </NextLink>
  )
}

export default Link
