'use client'

const RawHTML = ({ html, className }: { html: string; className?: string }) => {
  const sanitizedHtml = html
    ?.replaceAll(process.env.WORDPRESS_BASE_URL as string, '')
    .replaceAll(
      'src="/wp-content',
      `src="${process.env.WORDPRESS_BASE_URL}/wp-content`
    )
    .replaceAll(
      'srcset="/wp-content',
      `srcset="${process.env.WORDPRESS_BASE_URL}/wp-content`
    )
    .replaceAll(
      'src="wp-content',
      `src="${process.env.WORDPRESS_BASE_URL}/wp-content`
    )
    .replaceAll(
      'srcset="wp-content',
      `src="${process.env.WORDPRESS_BASE_URL}/wp-content`
    )

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: sanitizedHtml,
      }}
    />
  )
}

export default RawHTML
