const RawHTML = ({ html, className }: { html: string; className?: string }) => {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  )
}

export default RawHTML
