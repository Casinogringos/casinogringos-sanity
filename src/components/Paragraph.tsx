'use client'

const Paragraph = ({
  content,
  className,
}: {
  content: string
  className?: string
}) => {
  if (!content) return null
  const sanitizedContent = content.replaceAll(
    process.env.WORDPRESS_BASE_URL ?? '',
    ''
  )

  return (
    <p
      dangerouslySetInnerHTML={{
        __html: sanitizedContent,
      }}
      className={className}
    />
  )
}

export default Paragraph
