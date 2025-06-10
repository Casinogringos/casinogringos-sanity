import { ReactNode } from 'react'

const Link = ({
  href,
  rel,
  target,
  className,
  children,
  prefetch,
  role,
}: {
  href: string
  rel?: string
  target?: string
  className?: string
  children: ReactNode
  prefetch?: boolean
  role?: string
}) => {
  return (
    <Link
      role={role}
      href={href}
      rel={rel}
      target={target}
      className={className}
      prefetch={prefetch}
    >
      {children}
    </Link>
  )
}

export default Link
