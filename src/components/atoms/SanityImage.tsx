'use client'

import { useNextSanityImage } from 'next-sanity-image'
import type { SanityImage as SanityImageType } from '@/src/types'
import { getClient } from '@/src/lib/client'
import Image from 'next/image'
import Placeholder from '@/src/components/atoms/Placeholder'
import { SanityImageSchemaType } from '@/src/schemas'
const client = getClient()

const SanityImage = ({
  image,
  altText,
  width,
  className,
  priority = false,
}: {
  image: SanityImageSchemaType
  altText: string
  width: number
  className?: string
  priority?: boolean
}) => {
  const imageProps = useNextSanityImage(client, image)
  // console.log('image', image)
  if (!imageProps) {
    return <Placeholder message={'Sanity Image: Missing image'} />
  }
  return (
    <Image
      {...imageProps}
      alt={altText}
      style={{ width: '100%', height: 'auto' }}
      sizes="(max-width: 800px) 100vw, 800px"
      // width={width}
      className={className}
      priority={priority}
    />
  )
}

export default SanityImage
