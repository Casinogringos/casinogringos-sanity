type Item = {
  renderedHtml: string
}

const CasinoAffiliateButtonBlock = ({ item }: { item: Item }) => {
  const { renderedHtml } = item
  const sanitizedHtml = renderedHtml.replace(
    `${process.env.WORDPRESS_BASE_URL}/go`,
    '/go'
  )

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitizedHtml,
      }}
    />
  )
}

export default CasinoAffiliateButtonBlock
