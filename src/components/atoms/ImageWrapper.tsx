import { MediaItem } from '@/src/types'
import Image from 'next/image'

const ImageWrapper = ({
  image,
  width,
  className,
  priority = false,
  altText,
  quality = 75,
  ...rest
}: {
  image: MediaItem
  width: number
  className?: string
  priority?: boolean
  altText?: string
  quality?: number
}) => {
  const aspectRatio = image?.mediaDetails?.width / image?.mediaDetails?.height
  const height = width / aspectRatio
  const customClass = className ? className : undefined

  return (
    <Image
      width={width}
      height={height}
      alt={image?.altText ? image.altText : (altText ?? '')}
      src={image?.sourceUrl ? image?.sourceUrl : ''}
      className={customClass}
      priority={priority}
      quality={quality}
      {...rest}
    />
  )
}

export default ImageWrapper
