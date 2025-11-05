'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import ModularContent from '@/src/components/content/ModularContent'
import { HeadingObjectSchemaType } from '@/src/schemas/headingObject'
import { ImageObjectSchemaType } from '@/src/schemas/imageObject'
import { ParagraphObjectSchemaType } from '@/src/schemas/paragraphObject'

const ToggleBox = ({
  buttonTextOpen,
  buttonTextClose,
  innerBlocks,
  className,
}: {
  buttonTextOpen?: string
  buttonTextClose?: string
  innerBlocks: Array<
    HeadingObjectSchemaType | ImageObjectSchemaType | ParagraphObjectSchemaType
  >
  className?: string
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isClosing, setIsClosing] = useState<boolean>(false)
  useEffect(() => {
    if (!isOpen) {
      setIsClosing(true)
      setTimeout(() => {
        setIsClosing(false)
      }, 300)
    }
  }, [isOpen])

  return (
    <section className={className}>
      <div
        className={`${isOpen ? 'max-h-[500000px]' : 'max-h-[100px]'} transform transition overflow-hidden relative`}
      >
        {!isOpen || isClosing ? (
          <div
            className={`bg-gradient-to-t from-white absolute inset-0 transition-opacity ease-in-out duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
          />
        ) : null}
        <ModularContent objects={innerBlocks} nested={true} />
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={'flex items-center w-full relative'}
      >
        <div className={'h-[1px] bg-slate-100 w-full'} />
        {!buttonTextOpen && !buttonTextClose ? (
          <div
            className={`${isOpen ? 'rotate-180' : ''} transition rounded-full bg-slate-100 absolute left-1/2 -translate-x-1/2 -top-[18px] w-[36px] h-[36px] flex items-center justify-center`}
          >
            <ChevronDown className={'stroke-black'} />
          </div>
        ) : (
          <span
            className={
              'bg-slate-100 rounded-md text-dark absolute left-1/2 -translate-x-1/2 -top-[18px] px-5 py-1 block'
            }
          >
            {isOpen ? buttonTextClose : buttonTextOpen}
          </span>
        )}
      </button>
    </section>
  )
}

export default ToggleBox
