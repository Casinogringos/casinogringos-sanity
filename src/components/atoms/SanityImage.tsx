import Image from 'next/image'
import Placeholder from '@/src/components/atoms/Placeholder'
import { ImageObjectSchemaType } from '@/src/schemas/imageObject'
import { PortableText } from 'next-sanity'

const SanityImage = ({
  image,
  width = 1200,
  height = 600,
  className,
  priority = false,
  prose = true,
  rounded = 'md'
}: {
  image: ImageObjectSchemaType
  width?: number
  height?: number
  className?: string
  priority?: boolean
  prose?: boolean
  rounded?: 'sm' | 'md' | 'lg'
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
    lg: 'rounded-lg'
  }
  return (
    <div className={`${className} ${prose ? '' : 'not-prose'}`}>
      <Image
        src={image.src}
        alt={image.alt}
        priority={priority}
        width={width}
        height={height}
        className={roundedClasses[rounded]}
      />
      {image.caption && <div className="text-sm text-slate-500 text-center mt-2"><PortableText value={image.caption} /></div>}
    </div>
  )
}

export default SanityImage
