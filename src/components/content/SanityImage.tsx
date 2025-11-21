import Placeholder from '@/src/components/utils/Placeholder'
import { ImageObjectSchemaType } from '@/src/schemas/imageObject'
import { PortableText } from 'next-sanity'
import Image from 'next/image'

const SanityImage = ({
  image,
  width = 1200,
  height = 600,
  className,
  priority = false,
  prose = true,
  rounded = 'md',
  maxWidth,
}: {
  image: ImageObjectSchemaType
  width?: number
  height?: number
  className?: string
  priority?: boolean
  prose?: boolean
  rounded?: 'sm' | 'md' | 'lg'
  maxWidth?: number
}) => {
  if (!image?.src) {
    return <Placeholder message={'Sanity Image: Missing image src'} />
  }
  if (!image?.alt) {
    return <Placeholder message={'Sanity Image: Missing altText'} />
  }
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
  }
  return (
    <div
      className={`${className} not-prose my-5 flex items-center flex-col justify-center`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        priority={priority}
        width={width}
        height={height}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1200px"
        className={`${roundedClasses[rounded]} ${image.caption ? '!mb-0' : ''}`}
        style={{ maxWidth: maxWidth ?? '100%' }}
      />
      {image.caption && (
        <div className="text-sm text-slate-500 pt-3 text-center">
          <PortableText value={image.caption} />
        </div>
      )}
    </div>
  )
}

export default SanityImage
