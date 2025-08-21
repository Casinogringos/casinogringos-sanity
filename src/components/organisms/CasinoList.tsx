import { AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Heading from '@/src/components/atoms/Heading'
import CasinoCard from '@/src/components/organisms/CasinoCard'
import CheckBadgeIcon from '@/src/components/icons/CheckBadgeIcon'
import ToggleObject from '@/src/components/molecules/ToggleObject'
import { PortableTextBlock } from 'next-sanity'
import ToggleButton from '@/src/components/atoms/ToggleButton'
import ToggleItem from '@/src/components/atoms/ToggleItem'
import { CasinoPagePreviewSchemaType } from '@/src/schemas/casinoPagePreview'

export default function CasinoList({
  casinoPages,
  title,
  description,
  itemComponent,
}: {
  casinoPages: CasinoPagePreviewSchemaType[]
  title: string
  description: PortableTextBlock[]
  itemComponent: typeof CasinoCard
}) {
  const year = new Date().getFullYear()
  const ItemComponent = itemComponent
  const initialCasinoPages = casinoPages.slice(0, 24)
  const remainingCasinoPages = casinoPages.slice(24)

  return (
    <>
      <div className="mb-4">
        <ToggleButton
          id={'toplist-ad-information'}
          role={'button'}
          label={'Annonsinformation'}
        >
          <div className="ml-auto flex cursor-pointer justify-end text-sm items-center gap-1 py-2 text-xs2 text-slate-600">
            <AlertCircle className="size-3" />
            Annonsinformation
          </div>
        </ToggleButton>
        <ToggleItem id={'toplist-ad-information'}>
          <p className="rounded-md bg-white px-3 py-4 text-xs italic text-gray-700">
            Casinogringos.se är en jämförelsetjänst för online casinon och
            sidan innehåller reklamlänkar. När du klickar dig vidare till ett
            casino via oss kan vi därför komma att erhålla provision för detta
            från operatören, dock utan att det medför någon som helst kostnad
            för dig. Vårt dedikerade team har granskat samtliga casinon
            noggrant och endast de som uppfyller våra krav på säkerhet och
            kvalitet har tagits med i våra jämförelser.
          </p>
        </ToggleItem>
      </div>
      <ToggleObject title={'Varför oss?'}>
        Allt vårt innehåll genomgår en noggrann och detaljerad process för att
        säkerställa att all information vi publicerar stämmer och är
        tillförlitlig. Varje artikel, guide och recension granskas av våra{' '}
        <Link prefetch={false} href="/om-oss" className="text-blue-500">
          casinoexperter
        </Link>{' '}
        med lång erfarenhet. Vi arbetar opartiskt och utan påverkan från
        externa parter, vilket gör att vi kan erbjuda objektiva bedömningar
        och rekommendationer som våra läsare kan lita på. Vi strävar efter att
        hålla en hög standard för att ge den mest transparenta och uppdaterade
        informationen inom området.
      </ToggleObject>
      <div className="relative flex w-full flex-col-reverse lg:flex-row">
        <div className="pr-8 lg:pr-0">
          <Heading
            level={2}
            className="mb-0 !mt-1 text-xl tracking-normal lg:text-2xl"
            text={title}
          />
          <p className="text-gray-600 mb-5 mt-1 text-sm lg:mb-6">
            Alla casinon är licenserade och granskade av våra experter
            <CheckBadgeIcon className="ml-1 inline-block size-4 text-green-600" />
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
        {initialCasinoPages.map((casinoPage, index) => (
          <ItemComponent
            key={`casino-${casinoPage._id}-${index}`}
            casinoPage={casinoPage}
            index={index}
          />
        ))}
        <ToggleItem id={'show-more-casinos'}>
          {remainingCasinoPages.map((casinoPage, index) => (
            <ItemComponent
              key={`casino-${casinoPage._id}-${index}`}
              casinoPage={casinoPage}
              index={index}
            />
          ))}
        </ToggleItem>
      </div>
      <ToggleButton
        id={'show-more-casinos'}
        role={'button'}
        label={'Visa fler casinon'}
      >
        <div className="text-center">
          <div className='cursor-pointer inline-block py-2 px-4 rounded-md text-sm text-white bg-dark'>
            Visa fler casinon
          </div>
        </div>
      </ToggleButton>
    </>
  )
}
