import Image from 'next/image'

interface Props {
  title: string
  coverImage: {
    node: {
      sourceUrl: string
      altText: string
    }
  }
  width: number
  height: number
}

export default function CoverImage({
  title,
  coverImage,
  width,
  height,
}: Props) {
  const image = (
    <Image
      width={width ? width : 150}
      height={height ? height : 150}
      alt={coverImage?.node.altText ? coverImage?.node?.altText : title}
      src={coverImage?.node.sourceUrl}
      className={'rounded-full hover:shadow-medium'}
    />
  )
  return <div className="overflow-hidden rounded-full">{image}</div>
}
