import dynamic from 'next/dynamic'
const Paragraph = dynamic(() => import('@/src/components/content/Paragraph'))

const List = ({
  type,
  items,
  style,
  className,
}: {
  type: 'strings' | 'html'
  items: string[]
  style?: 'bullet'
  className?: string
}) => {
  if (type === 'strings') {
    return (
      <ul
        className={`${className} ${style === 'bullet' ? 'list-disc' : 'list-none'} list-disc pl-4 m-0 text-sm`}
      >
        {items.map((item, index) => (
          <li key={`list-item-${index}`}>{item}</li>
        ))}
      </ul>
    )
  }
  if (type === 'html') {
    return (
      <ul
        className={`${className} ${style === 'bullet' ? 'list-disc' : 'list-none'} list-disc pl-4 m-0 text-sm`}
      >
        {items.map((item, index) => (
          <li key={`list-item-${index}`}>
            <Paragraph content={item} />
          </li>
        ))}
      </ul>
    )
  }
  return null
}

export default List
