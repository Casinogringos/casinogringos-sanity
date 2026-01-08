'use client'

import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const Button = ({
  children,
  callback,
  className,
  size = 'medium',
  variant = 'primary',
  isActive = false,
}: {
  children: ReactNode
  callback?: () => void
  className?: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary' | 'affiliate' | 'outline'
  isActive?: boolean
}) => {
  const sizeClass = {
    small: 'p-2',
    medium: 'p-2',
    large: 'py-4 px-6',
  }
  const getClassName = () => {
    switch (variant) {
      case 'affiliate':
        return `bg-button hover:bg-button-hover not-prose inline-block justify-center lg:text-lg text-white no-underline text-center font-semibold rounded-md`
      case 'outline':
        return 'rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50'
      case 'primary':
        return 'rounded-md border border-dark/20 bg-dark px-4 py-2 font-medium text-white transition hover:text-primary'
      default:
        return `${isActive ? 'text-primary' : 'hover:text-primary'}`
    }
  }

  return (
    <button
      onClick={() => (callback ? callback() : null)}
      className={twMerge(
        getClassName(),
        sizeClass[size],
        'cursor-pointer',
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
