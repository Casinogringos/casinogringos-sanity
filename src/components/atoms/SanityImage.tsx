import Image from 'next/image'
import Placeholder from '@/src/components/atoms/Placeholder'
import { ImageObjectSchemaType, SanityImageSchemaType } from '@/src/schemas'

const SanityImage = ({
  image,
  width = 7680,
  height = 600,
  className,
  priority = false,
}: {
  image: ImageObjectSchemaType
  width?: number
  height?: number
  className?: string
  priority?: boolean
}) => {
  console.log('image', image)
  if (!image?.src) {
    return <Placeholder message={'Sanity Image: Missing image src'} />
  }
  if (!image?.alt) {
    return <Placeholder message={'Sanity Image: Missing altText'} />
  }
  return (
    <Image
      src={image.src}
      alt={image.alt}
      className={className}
      priority={priority}
      width={width}
      height={height}
    />
  )
}

export default SanityImage
