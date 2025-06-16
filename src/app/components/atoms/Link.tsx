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
}: {
  href: string
  rel?: string
  target?: string
  className?: string
  children: ReactNode
  prefetch?: boolean
  role?: string
  place?: string
}) => {
  return (
    <NextLink
      role={role}
      href={href}
      rel={rel}
      target={target}
      className={className}
      prefetch={prefetch}
    >
      {children}
    </NextLink>
  )
}

export default Link
