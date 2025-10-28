import { ImageObjectSchemaType } from '@/src/schemas/imageObject'
import SanityImage from '@/src/components/content/SanityImage'

const ImageObject = ({
  object,
  className,
  prose,
  rounded,
}: {
  object: ImageObjectSchemaType
  className?: string
  prose?: boolean
  rounded?: string
}) => {
  return (
    <SanityImage
      image={object}
      className={className ?? ''}
      prose={prose}
      width={1200}
      height={600}
      maxWidth={object.maxWidth}
    />
  )
}

export default ImageObject
