export default function PostTitle({ children }) {
  return (
    <h1
      className="text-2xl lg:text-4xl font-bold leading-tight md:leading-none mb-4 md:text-left"
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}
