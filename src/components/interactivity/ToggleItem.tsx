'use client'

import { useAppSelector } from '@/src/store/hooks'
import { type ReactNode } from 'react'

const ToggleItem = ({
  id,
  children,
  className,
  reverse = false,
  group
}: {
  id: string
  children: ReactNode
  className?: string
  reverse?: boolean
  group?: 'toggle' | 'faq'
}) => {
  const { toggleIds } = useAppSelector((state) => group === 'faq' ? state.faq : state.toggle)
  const isOpen = toggleIds.includes(id)
  const toggleClass = isOpen && reverse ? 'hidden' : isOpen && !reverse ? 'block' : reverse ? 'block' : 'hidden'

  return (
    <div className={`${toggleClass} ${className}`}>
      {children}
    </div>
  )
}

export default ToggleItem
