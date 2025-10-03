import Paragraph from '@/src/components/content/Paragraph'

const Placeholder = ({ message, className }: { message: string, className?: string }) => {
  return (
    <div className={'flex items-center justify-center bg-dark p-5 rounded-md ' + className}>
      <Paragraph content={message} className={'text-lg !text-white'} />
    </div>
  )
}

export default Placeholder
