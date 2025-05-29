'use client'

import { Post } from '@/types/index'
import { AlertCircle } from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import CasinoCard from './CasinoCard'
import Container from '../atoms/Container'
import CheckBadgeIcon from '../icons/CheckBadgeIcon'
import ToggleBlock from '../blocks/ToggleBlock'

export default function CasinoList({
  casinos,
  title,
  casinoHelper = false,
}: {
  casinos: { node: Post }[]
  title: string
  casinoHelper?: boolean
  showHeroAlert?: boolean
}) {
  const year = new Date().getFullYear()

  const [items, setItems] = useState(12)
  const [hideAdInformation, setHideAdInformation] = useState(true)

  const showMoreCasinos = () => {
    setItems(casinos.length)
  }
  const showAdInformation = () => setHideAdInformation(!hideAdInformation)
  const pathname = usePathname()

  return (
    <>
      <div className={`${!casinoHelper ? 'bg-slate100' : ''} pb-12`}>
        <Container disabled={casinoHelper}>
          {!casinoHelper && (
            <button
              onClick={showAdInformation}
              className="ml-auto flex cursor-pointer items-center gap-1 pt-2.5 text-xs2 text-slate600"
            >
              <AlertCircle className="size-3" />
              Annonsinformation
            </button>
          )}
          {!casinoHelper && (
            <>
              <div className={hideAdInformation ? 'hidden' : 'block py-4'}>
                <p className="rounded-md bg-white px-3 py-2 text-xs italic text-gray700">
                  Casinogringos.se är en jämförelsetjänst för online casinon och
                  sidan innehåller reklamlänkar. När du klickar dig vidare till
                  ett casino via oss kan vi därför komma att erhålla provision
                  för detta från operatören, dock utan att det medför någon som
                  helst kostnad för dig. Vårt dedikerade team har granskat
                  samtliga casinon noggrant och endast de som uppfyller våra
                  krav på säkerhet och kvalitet har tagits med i våra
                  jämförelser.
                </p>
              </div>
              <ToggleBlock className="mt-3" title={'Varför oss?'}>
                Allt vårt innehåll genomgår en noggrann och detaljerad process
                för att säkerställa att all information vi publicerar stämmer
                och är tillförlitlig. Varje artikel, guide och recension
                granskas av våra{' '}
                <Link prefetch={false} href="/om-oss" className="text-blue500">
                  casinoexperter
                </Link>{' '}
                med lång erfarenhet. Vi arbetar opartiskt och utan påverkan från
                externa parter, vilket gör att vi kan erbjuda objektiva
                bedömningar och rekommendationer som våra läsare kan lita på. Vi
                strävar efter att hålla en hög standard för att ge den mest
                transparenta och uppdaterade informationen inom området.
              </ToggleBlock>
              <div className="relative flex w-full flex-col-reverse lg:flex-row">
                <div className="pr-8 lg:pr-0">
                  <h2 className="mb-0 mt-1 text-xl tracking-normal lg:text-2xl">
                    {title} {year}
                  </h2>
                  <p className="text-gray-600 mb-5 mt-1 text-sm lg:mb-6">
                    Alla casinon är licenserade och granskade av våra experter
                    <CheckBadgeIcon className="ml-1 inline-block size-4 text-green600" />
                  </p>
                </div>
              </div>
            </>
          )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {casinos.slice(0, items).map((casino, i) => (
              <div key={`casino-${casino.node.id}--default`}>
                <CasinoCard
                  pathname={pathname}
                  count={i + 1}
                  item={casino.node}
                />
              </div>
            ))}
          </div>
          {items < casinos.length && (
            <button
              onClick={showMoreCasinos}
              className="mx-auto mb-6 mt-12 flex rounded-md bg-normal px-6 py-3 font-semibold text-white"
              type="button"
            >
              Visa fler casinon
            </button>
          )}
        </Container>
      </div>
    </>
  )
}
