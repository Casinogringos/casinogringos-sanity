import { ReactNode } from 'react'

export default function Container({
  children,
  width = 6,
  className = '',
  disabled = false,
}: {
  children: ReactNode
  width?: number
  className?: string
  disabled?: boolean
}) {
  const widthClasses = {
    6: 'max-w-6xl',
    5: 'max-w-5xl',
    4: 'max-w-4xl',
    3: 'max-w-3xl',
    2: 'max-w-2xl',
    1: 'max-w-xl',
  }
  const classNames = disabled
    ? ''
    : `${widthClasses[width as keyof typeof widthClasses]} mx-auto w-full px-4 relative ${className}`

  return <div className={classNames}>{children}</div>
}
