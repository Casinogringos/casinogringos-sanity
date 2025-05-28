'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const AccordionItem = ({
  showDescription,
  ariaExpanded,
  fontWeightBold,
  item,
  index,
  onClick,
}) => (
  <div key={item.faqQuestion} className={'rounded-md mb-3 overflow-hidden'}>
    <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
      <button
        key={item.faqQuestion}
        aria-expanded={ariaExpanded}
        aria-controls={`faq${index + 1}_desc`}
        data-qa="faq__question-button"
        className={`bg-lightBlue2 w-full p-5 ${fontWeightBold}`}
        onClick={onClick}
      >
        <h3
          className={
            'text-white text-left text-base font-normal w-full flex justify-between items-center'
          }
          itemProp="name"
        >
          <span>{item.faqQuestion}</span>
          <ChevronDown
            className={`w-5 h-5 ms-3 ${showDescription ? 'rotate-180' : ''}`}
          />
        </h3>
      </button>
      <div
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
        id={`faq${index + 1}_desc`}
        data-qa="faq__desc"
        className={`bg-lightBlue2 p-5 mt-1 ${
          showDescription ? 'block' : 'hidden'
        }`}
      >
        <div
          itemProp="text"
          className="text-slate100 text-base"
          dangerouslySetInnerHTML={{ __html: item.faqAnswer }}
        />
      </div>
    </div>
  </div>
)

const Accordion = ({ questionsAnswers, subtitle }) => {
  const [activeIndex, setActiveIndex] = useState()
  const renderedQuestionsAnswers = questionsAnswers
    ? questionsAnswers.map((item, index) => {
        const showDescription = index === activeIndex ? 'show-description' : ''
        const fontWeightBold = index === activeIndex ? 'font-weight-bold' : ''
        const ariaExpanded = index === activeIndex ? 'true' : 'false'

        return (
          <AccordionItem
            showDescription={showDescription}
            fontWeightBold={fontWeightBold}
            ariaExpanded={ariaExpanded}
            item={item}
            key={`question-${item.faqQuestion}`}
            index={index}
            onClick={() => {
              if (index !== activeIndex) {
                setActiveIndex(index)
              } else {
                setActiveIndex(undefined)
              }
            }}
          />
        )
      })
    : undefined

  return (
    <div itemScope itemType="https://schema.org/FAQPage">
      <div className="mb-12 text-center">
        <h2 className="text-white text-3xl mb-4 font-semibold">
          Frågor och svar
        </h2>
        {subtitle && <p className="lg:text-lg text-slate300">{subtitle}</p>}
      </div>
      <div>{renderedQuestionsAnswers}</div>
    </div>
  )
}

export default Accordion
