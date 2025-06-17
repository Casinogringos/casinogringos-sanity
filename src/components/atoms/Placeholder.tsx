import Paragraph from '@/src/components/atoms/Paragraph'

const Placeholder = ({ message }: { message: string }) => {
  return (
    <div className={'flex items-center justify-center bg-dark p-5 rounded-md'}>
      <Paragraph content={message} className={'text-lg text-white'} />
    </div>
  )
}

export default Placeholder
