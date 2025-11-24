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
  variant,
  group,
  hide = false,
}: {
  id: string
  rotate?: boolean
  role: string
  label: string
  className?: string
  childClassName?: string
  children: ReactNode
  variant?: 'primary' | 'affiliate'
  group?: 'faq' | undefined
  hide?: boolean
}) => {
  const dispatch = useAppDispatch()
  const { toggleIds } = useAppSelector((state) =>
    group === 'faq' ? state.faq : state.toggle
  )
  const isOpen = toggleIds.includes(id)
  const handleToggle = () => {
    dispatch(group === 'faq' ? toggleIdFaq(id) : toggleId(id))
  }
  const isMenuItemRole = role === 'menuitem' || role === 'menuitemcheckbox'
  const getClassName = () => {
    switch (variant) {
      case 'affiliate':
        return `bg-button hover:bg-button-hover not-prose inline-block justify-center lg:text-lg text-white no-underline text-center font-semibold rounded-md`
      case 'primary':
        return 'rounded-md border border-dark/20 bg-dark px-4 py-2 font-medium text-white transition hover:text-primary'
      default:
        return ''
    }
  }

  return (
    <>
      {
        isOpen && hide ? null : <button
          onClick={handleToggle}
          className={`cursor-pointer ${className ?? ''}`}
          aria-label={label}
          aria-expanded={isOpen}
          aria-pressed={isMenuItemRole ? undefined : isOpen}
          aria-haspopup={isMenuItemRole ? true : undefined}
          role={role}>
          <div className={`${getClassName()} ${childClassName ?? ''}`}>{children}</div>
        </button>
      }
    </>
  )
}

export default ToggleButton
