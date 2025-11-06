'use client'

import { JSX, createElement } from 'react'
import { slugify } from '@/src/lib/utils'
import { jakarta } from '@/src/styles/fonts'

const HeadingObject = ({
  text,
  level,
  index,
  className = '',
  children,
}: {
  text?: string
  level: number
  index?: number
  className?: string
  children?: JSX.Element
}) => {
  if (!text) return null
  if (!level) return null
  const slug = slugify(text)
  const Tag: string = `h${level}` as keyof JSX.IntrinsicElements
  const html = `<span class='absolute -top-20' id='${slug}'></span>${text ?? children}`
  return createElement(Tag, {
    className:
      index === 0
        ? `mt-0 relative ${className} ${jakarta.className}`
        : `${className} relative ${jakarta.className}`,
    dangerouslySetInnerHTML: { __html: html },
  })
}

export default HeadingObject
