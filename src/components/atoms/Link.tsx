const Link = ({
  href,
  rel,
  target,
  className,
  children,
  prefetch,
}: {
  href: string
  rel?: string
  target?: string
  className?: string
  children: React.ReactNode
  prefetch?: boolean
}) => {
  return (
    <Link
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
