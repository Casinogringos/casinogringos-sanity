import { slugify } from '@/src/lib/utils'
import { jakarta } from '@/src/styles/fonts'
import { JSX, createElement } from 'react'

const Heading = ({
  text,
  level,
  index,
  className = '',
  children,
  sizes = [6, 8, 8],
}: {
  text?: string
  level: number
  index?: number
  className?: string
  children?: JSX.Element
  sizes?: number[]
}) => {
  if (!text) return null
  if (!level) return null
  const slug = slugify(text)
  const sizeClasses = {
    1: 'text-xs',
    2: 'text-sm',
    3: 'text-base',
    4: 'text-lg',
    5: 'text-xl',
    6: 'text-2xl',
    7: 'text-3xl',
    8: 'text-4xl',
    9: 'text-5xl',
    10: 'text-6xl',
  }
  const getSizeClasses = () => {
    return sizes.map((size, index) => {
      return `${index === 1 ? 'md:' : index === 2 ? 'lg:' : ''}${sizeClasses[size as keyof typeof sizeClasses]}`
    })
  }
  const Tag: string = `h${level}` as keyof JSX.IntrinsicElements
  const html = `<span class='absolute -top-20' id='${slug}'></span>${text ?? children}`
  return createElement(Tag, {
    className:
      index === 0
        ? `mt-0 relative ${className} ${jakarta.className}`
        : `${className} relative ${getSizeClasses().join(' ')} ${jakarta.className}`,
    dangerouslySetInnerHTML: { __html: html },
  })
}

export default Heading
