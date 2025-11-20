'use client'

import { useAppSelector } from '@/src/store/hooks'
import { type ReactNode } from 'react'

const ToggleItem = ({
  id,
  children,
  className,
  reverse = false,
  group,
  hideFromDom = false
}: {
  id: string
  children: ReactNode
  className?: string
  reverse?: boolean
  group?: 'toggle' | 'faq'
  hideFromDom?: boolean
}) => {
  const { toggleIds } = useAppSelector((state) => group === 'faq' ? state.faq : state.toggle)
  const isOpen = toggleIds.includes(id)
  const toggleClass = isOpen && reverse ? 'hidden' : isOpen && !reverse ? 'block' : reverse ? 'block' : 'hidden'

  return (
    <>
      {hideFromDom && !isOpen ? null : <div className={`${toggleClass} ${className ?? ''}`}>
        {children}
      </div>}
    </>
  )
}

export default ToggleItem
