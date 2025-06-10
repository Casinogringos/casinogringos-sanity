'use client'

import { JSX, createElement } from 'react'
import { slugify } from '@/src/lib/helpers'

const Heading = ({
  text,
  level,
  index,
  className = '',
  children,
}: {
  text: string
  level: number
  index?: number
  className?: string
  children?: JSX.Element
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
  const Tag: string = `h${level}` as keyof JSX.IntrinsicElements
  const html = `<span class='absolute -top-20' id='${slug}'></span>${text ?? children}`
  return createElement(Tag, {
    className:
      index === 0
        ? `mt-0 relative ${className}`
        : `${tagClasses[level as keyof typeof tagClasses]} mt-10 ${className}`,
    dangerouslySetInnerHTML: { __html: html },
  })
}

export default Heading
