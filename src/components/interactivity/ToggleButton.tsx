'use client'

import { toggleId as toggleIdFaq } from '@/src/store/faqSlice'
import { useAppDispatch, useAppSelector } from '@/src/store/hooks'
import { toggleId } from '@/src/store/toggleSlice'
import { type ReactNode } from 'react'

const ToggleButton = ({
  id,
  rotate = true,
  role,
  label,
  className,
  childClassName,
  children,
  group,
}: {
  id: string
  rotate?: boolean
  role: string
  label: string
  className?: string
  childClassName?: string
  children: ReactNode
  group?: 'faq' | undefined
}) => {
  const dispatch = useAppDispatch()
  const { toggleIds } = useAppSelector((state) =>
    group === 'faq' ? state.faq : state.toggle
  )
  const isOpen = toggleIds.includes(id)
  const handleToggle = () => {
    dispatch(group === 'faq' ? toggleIdFaq(id) : toggleId(id))
  }

  return (
    <button
      onClick={handleToggle}
      className={`cursor-pointer w-full ${className ?? ''}`}
      aria-label={label}
      aria-expanded={isOpen}
      aria-pressed={isOpen}
      role={role}>
      <div className={childClassName}>{children}</div>
    </button>
  )
}

export default ToggleButton
