'use client'

import { useNextSanityImage } from 'next-sanity-image'
import type { SanityImage as SanityImageType } from '@/src/types'
import { getClient, urlFor } from '@/src/lib/client'
import Image from 'next/image'
import Placeholder from '@/src/components/atoms/Placeholder'
import { SanityImageSchemaType } from '@/src/schemas'
import ImageService from '@/src/services/ImageService'
const imageService = new ImageService()
const client = getClient()

const SanityImage = ({
  image,
  width,
  className,
  priority = false,
}: {
  image: SanityImageSchemaType
  width?: number
  className?: string
  priority?: boolean
}) => {
  const imageProps = useNextSanityImage(client, image)
  // console.log('image', image)
  if (!imageProps) {
    return <Placeholder message={'Sanity Image: Missing image'} />
  }
  if (!image.alt) {
    return <Placeholder message={'Sanity Image: Missing altText'} />
  }
  return (
    <Image
      {...imageProps}
      loader={({ width, quality }) =>
        imageService.vanityImageLoader({ image, width, quality })
      }
      alt={image.alt}
      className={className}
      priority={priority}
      width={width}
    />
  )
}

export default SanityImage
