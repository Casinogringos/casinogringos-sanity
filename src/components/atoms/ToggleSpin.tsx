'use client'

import { type ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '@/src/store/hooks'
import { toggleId } from '@/src/store/toggleSlice'

const ToggleButton = ({
  id,
  rotate = true,
  className,
  children,
}: {
  id: string
  rotate?: boolean
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
      <div
        className={`${rotate && isOpen ? 'rotate-180' : ''} transition-transform ease-in-out duration-200`}
      >
        {children}
      </div>
    </>
  )
}

export default ToggleButton
