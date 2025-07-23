'use client'

import { useAppSelector } from '@/src/store/hooks'
import { type ReactNode } from 'react'

const ToggleItem = ({
  id,
  children,
  className,
  reverse = false,
}: {
  id: string
  children: ReactNode
  className?: string
  reverse?: boolean
}) => {
  const { toggleIds } = useAppSelector((state) => state.toggle)
  const isOpen = toggleIds.includes(id)
  const toggleClass = isOpen && reverse ? 'hidden' : isOpen && !reverse ? 'block' : 'hidden'

  return (
    <div className={`${toggleClass} ${className}`}>
      {children}
    </div>
  )
}

export default ToggleItem
