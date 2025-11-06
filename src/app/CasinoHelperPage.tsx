// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client'

import { useEffect, useState } from 'react'
import Container from '@/src/components/layout/Container'
import { ChevronLeft } from 'lucide-react'
import Paragraph from '@/src/components/content/Paragraph'
import Button from '@/src/components/content/Button'
import CasinoList from '@/src/components/casino/CasinoList'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
import CasinoCard from '@/src/components/casino/CasinoCard'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'

const CasinoHelperPage = ({
  initialCasinoPages,
}: {
  initialCasinoPages: CasinoPageSchemaType[]
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [getWebSiteStructuredData(), getOrganizationStructuredData()],
  }
  const [casinoPages, setCasinoPages] = useState<CasinoPageSchemaType[] | null>(
    initialCasinoPages
  )
  const [index, setIndex] = useState<number>(0)
  const [category, setCategory] = useState<'casino' | 'betting' | null>(null)
  const [history, setHistory] = useState<{ index: number; state: string[] }[]>(
    []
  )
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [index])
  const handleAnswer = ({
    answer,
    index,
  }: {
    answer: {
      text: string
      nextIndex: number
      previousIndex: number
      callback:
        | ((
            items: CasinoPageSchemaType[] | null
          ) => CasinoPageSchemaType[] | null)
        | null
    }
    index: number
  }) => {
    const { nextIndex, callback } = answer
    setHistory((prev) => [
      ...prev,
      { index: index, state: casinoPages?.map((item) => item._id) ?? [] },
    ])
    const newCasinoPages = callback ? callback(casinoPages) : casinoPages
    setCasinoPages(newCasinoPages)
    setIndex(nextIndex)
  }
  const handleStartAgain = () => {
    setCasinoPages(initialCasinoPages)
    setIndex(0)
  }
  const questions = [
    {
      question: 'Vad är du intresserad av?',
      answers: [
        {
          text: 'Betting',
          nextIndex: 1,
          callback: (items: CasinoPageSchemaType[]) => {
            setCategory('betting')
            return items.filter((item: CasinoPageSchemaType) =>
              item.categories?.some(
                (category) => category.slug.current === 'bettingsidor'
              )
            )
          },
        },
        {
          text: 'Casino',
          nextIndex: 1,
          callback: (items: CasinoPageSchemaType[]) => {
            setCategory('casino')
            return items.filter((item: CasinoPageSchemaType) =>
              item.categories?.some(
                (category) => category.slug.current === 'casino'
              )
            )
          },
        },
        {
          text: 'Både och',
          nextIndex: 1,
          callback: (items: CasinoPageSchemaType[]) => {
            setCategory(null)
            return items.filter(
              (item: CasinoPageSchemaType) =>
                !item.categories?.some(
                  (category) => category.slug.current === 'exkludera'
                )
            )
          },
        },
      ],
    },
    {
      question: 'Är en bonus viktig för dig?',
      answers: [
        {
          text: 'Ja',
          nextIndex: 2,
          callback: (items: CasinoPageSchemaType[]) => {
            if (category) {
              return items.filter((item: CasinoPageSchemaType) =>
                item.categories?.some(
                  (category) =>
                    category.slug.current ===
                    (category.slug.current === 'casino'
                      ? 'casino-bonus'
                      : 'betting-bonus')
                )
              )
            } else {
              return items.filter((item: CasinoPageSchemaType) =>
                item.categories?.some(
                  (category) =>
                    category.slug.current === 'betting-bonus' ||
                    category.slug.current === 'casino-bonus'
                )
              )
            }
          },
        },
        {
          text: 'Nej',
          nextIndex: 3,
          callback: null,
        },
      ],
    },
    {
      question: 'Vill du ha free spins eller bonuspengar?',
      answers: [
        {
          text: 'Både och / Spelar ingen roll',
          nextIndex: 3,
          callback: null,
        },
        {
          text: 'Bonuspengar',
          nextIndex: 3,
          callback: (items: CasinoPageSchemaType[]) =>
            items.filter((item: CasinoPageSchemaType) =>
              item.categories?.some(
                (category) => category.slug.current === 'casino-bonus'
              )
            ),
        },
        {
          text: 'Free spins',
          nextIndex: 3,
          callback: (items: CasinoPageSchemaType[]) =>
            items.filter((item: CasinoPageSchemaType) =>
              item.categories?.some(
                (category) => category.slug.current === 'freespins'
              )
            ),
        },
      ],
    },
    {
      question: 'Vilken betalningsmetod vill du använda?',
      answers: [
        {
          text: 'Swish',
          nextIndex: 4,
          callback: (items: CasinoPageSchemaType[]) =>
            items.filter((item: CasinoPageSchemaType) =>
              item.casino.availableDepositMethods?.some(
                (method) => method.slug.current === 'swish'
              )
            ),
        },
        {
          text: 'Trustly',
          nextIndex: 4,
          callback: (items: CasinoPageSchemaType[]) =>
            items.filter((item: CasinoPageSchemaType) =>
              item.casino.availableDepositMethods?.some(
                (method) => method.slug.current === 'trustly'
              )
            ),
        },
        {
          text: 'Zimpler',
          nextIndex: 4,
          callback: (items: CasinoPageSchemaType[]) =>
            items.filter((item: CasinoPageSchemaType) =>
              item.casino.availableDepositMethods?.some(
                (method) => method.slug.current === 'zimpler'
              )
            ),
        },
        {
          text: 'E-plånbok',
          nextIndex: 4,
          callback: (items: CasinoPageSchemaType[]) =>
            items.filter((item: CasinoPageSchemaType) =>
              item.casino.availableDepositMethods?.some(
                (method) => method.slug.current === 'apple-pay'
              )
            ),
        },
        {
          text: 'Kort',
          nextIndex: 4,
          callback: (items: CasinoPageSchemaType[]) =>
            items.filter((item: CasinoPageSchemaType) =>
              item.casino.availableDepositMethods?.some(
                (method) =>
                  method.slug.current === 'visa' ||
                  method.slug.current === 'mastercard'
              )
            ),
        },
        {
          text: 'Spelar ingen roll / Annan',
          nextIndex: 4,
          callback: null,
        },
      ],
    },
    {
      question: 'Hur mycket vill du sätta in?',
      answers: [
        {
          text: 'Under 100 kr',
          nextIndex: 5,
          callback: (items: CasinoPageSchemaType[]) =>
            items.filter((item: CasinoPageSchemaType) => {
              return item.casino.casinoBonuses?.some(
                (bonus) => bonus.bonusAmountRange[0] < 100
              )
            }),
        },
        {
          text: '100 kr',
          nextIndex: 5,
          callback: (items: CasinoPageSchemaType[]) =>
            items.filter((item: CasinoPageSchemaType) => {
              return item.casino.casinoBonuses?.some(
                (bonus) => bonus.bonusAmountRange[0] >= 100
              )
            }),
        },
        {
          text: '200 kr eller mer',
          nextIndex: 5,
          callback: null,
        },
      ],
    },
  ]

  if (!casinoPages?.length)
    return (
      <div
        className={'py-6 lg:py-12 flex flex-col items-center justify-center'}
      >
        <Container>
          <div
            className={'flex flex-col items-center justify-center lg:h-[400px]'}
          >
            <Paragraph
              content={
                'Inga casinon matchar dina kriterier. Försök gärna igen.'
              }
              className={'mb-10 text-sm text-gray500'}
            />
            <Button
              size={'large'}
              className="lg:text-[17px]"
              callback={handleStartAgain}
            >
              Börja om
            </Button>
          </div>
        </Container>
      </div>
    )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        key="casino-helper-page-structured-data"
      />
      <div className={'min-h-[96svh] py-6 lg:py-12'}>
        <Container className="min-h-[80svh] lg:min-h-[65svh] flex flex-col justify-between">
          <div>
            {index === 0 && (
              <span
                className={
                  'w-fit mx-auto text-center p-4 rounded-md text-gray800 mt-8 mb-6 block'
                }
              >
                Hej och välkommen till casinohjälpen! För att kunna hjälpa dig
                hitta rätt casino behöver vi ställa några frågor, det tar bara
                någon minut.
              </span>
            )}
            {index === questions.length ? (
              <>
                <span
                  className={
                    'w-fit bg-slate100 p-4 rounded-md text-gray700 mb-6 block'
                  }
                >
                  Toppen! Vi hittade{' '}
                  <strong>{casinoPages.length} casinon</strong> som matchar dina
                  kriterier - Här är resultaten.
                </span>
                <CasinoList
                  casinos={casinoPages.map((item) => ({ node: item }))}
                  title={'Casinohjalpen Results'}
                  itemComponent={CasinoCard}
                />
                <div className={'flex items-center justify-center'}>
                  <Button size={'large'} callback={handleStartAgain}>
                    Börja om
                  </Button>
                </div>
              </>
            ) : (
              <div
                className={
                  'flex flex-col items-center justify-between gap-y-10'
                }
              >
                {index !== 0 && (
                  <span className={'text-sm text-gray700 mt-6'}>
                    {casinoPages.length} casinon matchar dina kriterier
                  </span>
                )}
                <Paragraph
                  content={questions[index].question}
                  className={'bg-slate100 p-4 rounded-md'}
                />
                {index !== 0 && (
                  <div>
                    <div
                      onClick={() => {
                        setCasinoPages(
                          history[history.length - 1].state
                            .map((id) =>
                              initialCasinoPages.find((item) => item._id === id)
                            )
                            .filter(
                              (item) => item !== undefined
                            ) as CasinoPageSchemaType[]
                        )
                        setIndex(history[history.length - 1].index)
                        setHistory((prev) => prev.slice(0, history.length - 1))
                      }}
                      className={'rounded-full bg-gray100 p-4 cursor-pointer'}
                    >
                      <ChevronLeft className={'h-4 w-4'} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {index !== questions.length && (
            <div className="flex flex-wrap gap-3 justify-center items-center">
              {questions[index].answers.map((answer, i) => (
                <Button
                  key={`answer-${i}`}
                  callback={() =>
                    handleAnswer({
                      answer: { ...answer, previousIndex: i },
                      index,
                    })
                  }
                  className="lg:text-[17px]"
                  size={'large'}
                >
                  {answer.text}
                </Button>
              ))}
            </div>
          )}
        </Container>
      </div>
    </>
  )
}

export default CasinoHelperPage
