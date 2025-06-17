'use client'

import { type ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '@/src/store/hooks'
import { toggleId } from '@/src/store/toggleSlice'

const ToggleSwitch = ({
  id,
  rotate = true,
  className,
  open,
  close,
}: {
  id: string
  rotate?: boolean
  className?: string
  open: ReactNode
  close: ReactNode
}) => {
  const dispatch = useAppDispatch()
  const { toggleIds } = useAppSelector((state) => state.toggle)
  const isOpen = toggleIds.includes(id)
  const handleToggle = () => {
    dispatch(toggleId(id))
  }
  console.log('toggle ids', toggleIds)

  return <>{isOpen ? open : close}</>
}

export default ToggleSwitch
