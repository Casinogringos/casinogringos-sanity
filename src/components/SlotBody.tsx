export default function PostBody({ content }) {
  return (
    <div
      className="py-12 mx-auto prose prose-lg text-white font-inter prose-headings:font-bold prose-headings:font-roboto prose-headings:text-dark max-w-4xl"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
