import Paragraph from '@/src/app/components/atoms/Paragraph'

const Heading = dynamic(() => import('@/src/app/components/atoms/Heading'))
import List from '@/src/app/components/molecules/List'
import dynamic from 'next/dynamic'

const SummaryBox = ({
  title,
  content,
  className,
}: {
  title?: string
  content: string | string[]
  className?: string
}) => {
  const isList = Array.isArray(content)

  return (
    <div className={`${className} bg-slate100 p-4 rounded-md`}>
      {title && (
        <Heading
          className={'mt-0 mb-3'}
          attributes={{
            level: 2,
            text:
              title ??
              'Sammanfattningen är gjord med OpenAI och kontrollerad av redaktionen på Casinogringos.',
          }}
        />
      )}
      {isList ? (
        <List type={'strings'} items={content} />
      ) : (
        <Paragraph content={content} />
      )}
    </div>
  )
}

export default SummaryBox
