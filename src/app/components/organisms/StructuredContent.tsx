import { PortableText, PortableTextBlock } from 'next-sanity'

const StructuredContent = ({
  structuredText,
  className,
}: {
  structuredText: PortableTextBlock
  className?: string
}) => {
  return (
    <div className={className}>
      <PortableText value={structuredText} />
    </div>
  )
}

export default StructuredContent
