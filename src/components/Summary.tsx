const Heading = dynamic(() => import('@/components/Heading'))
import List from '@/components/List'
import dynamic from 'next/dynamic'

const Summary = ({
  attributes,
  content,
  className,
}: {
  attributes: { title: string }
  content: string
  className?: string
}) => {
  const { title } = attributes

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
      <List type={'strings'} items={content.split('<br>')} />
    </div>
  )
}

export default Summary
