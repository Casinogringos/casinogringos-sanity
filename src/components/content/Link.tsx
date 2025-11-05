'use client'

import { usePlausible } from 'next-plausible'
import { ReactNode, useCallback } from 'react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { isCurrentPath } from '@/src/lib/utils'
import Placeholder from '@/src/components/utils/Placeholder'
import {
  closedMainMenu,
  closeMainMenu,
  closingMainMenu,
} from '@/src/store/menuSlice'
import { useAppDispatch } from '@/src/store/hooks'

const Link = ({
  href,
  rel,
  target,
  className,
  children,
  prefetch = false,
  role,
  place,
  label,
  current,
  replace,
  plausible,
  variant,
  title,
  disabled,
  size = 'md',
  underline = false,
  onClick,
  actions,
}: {
  href: string
  rel?: string
  target?: string
  className?: string
  children: ReactNode
  prefetch?: boolean
  title?: string
  role?: string
  place?: string
  label?: string
  current?: string
  replace?: boolean
  plausible?: {
    eventName: string
    props: Record<string, string>
  }
  variant?: 'affiliate' | 'ghost' | 'primary'
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  underline?: boolean
  onClick?: () => void
  actions?: string[]
}) => {
  const plausibleMethod = usePlausible()
  const pathname = usePathname()
  const isActive = isCurrentPath(pathname, href)
  const paddingClasses = {
    sm: 'px-4 py-2',
    md: 'px-5 py-3',
    lg: 'px-6 py-4',
  }
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }
  const getClassName = () => {
    switch (variant) {
      case 'affiliate':
        return `bg-button hover:bg-button-hover not-prose inline-block justify-center text-white no-underline text-center font-semibold ${paddingClasses[size]} ${sizeClasses[size]} rounded-md`
      case 'primary':
        return 'rounded-md border border-dark/20 bg-dark px-4 py-2 font-medium text-white transition hover:text-primary'
      default:
        return `${isActive ? 'text-primary' : 'hover:text-primary'} ${underline ? 'underline' : ''}`
    }
  }
  const dispatch = useAppDispatch()
  const closeMenu = useCallback(() => {
    dispatch(closingMainMenu())
    setTimeout(() => {
      dispatch(closeMainMenu())
      dispatch(closedMainMenu())
    }, 300)
    document.body.classList.remove('overflow-hidden')
  }, [dispatch])
  const runActions = () => {
    if (!actions) return
    for (const action of actions) {
      switch (action) {
        case 'close-menu':
          closeMenu()
      }
    }
  }
  if (!href) return <Placeholder message={'Link component missing the href'} />

  return (
    <NextLink
      role={role}
      href={href}
      rel={rel}
      replace={replace}
      target={target}
      className={`${className} ${getClassName()}`}
      prefetch={prefetch}
      aria-label={label}
      title={title}
      onClick={() => {
        if (onClick) onClick()
        runActions()
        if (!plausible) return
        plausibleMethod(plausible.eventName, {
          props: { ...plausible.props, pathname, place },
        })
      }}
    >
      {children}
    </NextLink>
  )
}

export default Link
