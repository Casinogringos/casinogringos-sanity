'use client'

import { type ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '@/src/store/hooks'
import { toggleId } from '@/src/store/toggleSlice'

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
  console.log('toggle ids', toggleIds)

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
        <div>{children}</div>
      </label>
    </>
  )
}

export default ToggleButton
