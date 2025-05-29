'use client'

import { type ReactNode } from 'react'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../casinogringos-v3/src/store/hooks'
import { toggleId } from '../../../../casinogringos-v3/src/store/toggleSlice'

const ToggleButton = ({
  id,
  rotate = true,
  role,
  label,
  className,
  children,
}: {
  id: string
  rotate?: boolean
  role: string
  label: string
  className?: string
  children: ReactNode
}) => {
  const dispatch = useAppDispatch()
  const { toggleIds } = useAppSelector((state) => state.toggle)
  const isOpen = toggleIds.includes(id)
  const handleToggle = () => {
    dispatch(toggleId(id))
  }

  return (
    <>
      <input type="checkbox" className={'toggle-visibility-button'} id={id} />
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
        <div
          className={`${rotate && isOpen ? 'rotate-180' : ''} transition-transform ease-in-out duration-200`}
        >
          {children}
        </div>
      </label>
    </>
  )
}

export default ToggleButton
