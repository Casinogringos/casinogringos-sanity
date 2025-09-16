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
}: {
  image: ImageObjectSchemaType
  width?: number
  height?: number
  className?: string
  priority?: boolean
}) => {
  if (!image?.src) {
    return <Placeholder message={'Sanity Image: Missing image src'} />
  }
  if (!image?.alt) {
    return <Placeholder message={'Sanity Image: Missing altText'} />
  }
  return (
    <div className={`${className} not-prose`}>
      <Image
        src={image.src}
        alt={image.alt}
        priority={priority}
        width={width}
        height={height}
      />
      {image.caption && <div className="text-sm text-slate-500 text-center mt-2"><PortableText value={image.caption} /></div>}
    </div>
  )
}

export default SanityImage
