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
    <>
      <input type="checkbox" className={'hidden'} id={id} />
      <label
        htmlFor={id}
        className={`cursor-pointer ${className}`}
        aria-label={label}
        aria-haspopup={isOpen}
        aria-checked={isOpen}
        aria-expanded={isOpen}
        role={role}
        onClick={handleToggle}
      >
        <div className={childClassName}>{children}</div>
      </label>
    </>
  )
}

export default ToggleButton
