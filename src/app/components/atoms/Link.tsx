import { ReactNode } from 'react'

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
    <Link
      role={role}
      href={href}
      rel={rel}
      target={target}
      className={className}
      prefetch={prefetch}
      place={place}
    >
      {children}
    </Link>
  )
}

export default Link
