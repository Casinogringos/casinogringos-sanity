'use client'

import { JSX, createElement } from 'react'
import { slugify } from '@/src/lib/helpers'

const Heading = ({
  text,
  level,
  index,
  className = '',
  children,
  size = 3
}: {
  text?: string
  level: number
  index?: number
  className?: string
  children?: JSX.Element
  size?: number
}) => {
  if (!text) return null
  if (!level) return null
  const slug = slugify(text)
  const tagClasses = {
    1: 'text-4xl font-bold mb-5',
    2: 'text-3xl font-bold',
    3: 'text-2xl font-bold',
    4: 'text-xl font-bold',
    5: 'text-lg font-bold',
    6: 'text-base font-bold',
  }
  const sizeClasses = {
    1: 'text-xs',
    2: 'text-sm',
    3: 'text-base',
    4: 'text-lg',
    5: 'text-xl',
    6: 'text-2xl',
  }
  const Tag: string = `h${level}` as keyof JSX.IntrinsicElements
  const html = `<span class='absolute -top-20' id='${slug}'></span>${text ?? children}`
  return createElement(Tag, {
    className:
      index === 0
        ? `mt-0 relative ${className}`
        : `${tagClasses[level as keyof typeof tagClasses]} mt-10 ${className} ${sizeClasses[size as keyof typeof sizeClasses]}`,
    dangerouslySetInnerHTML: { __html: html },
  })
}

export default Heading
