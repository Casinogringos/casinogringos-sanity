import CasinoCard from '@/src/components/casino/CasinoCard'
import Heading from '@/src/components/content/Heading'
import CheckBadgeIcon from '@/src/components/icons/CheckBadgeIcon'
import QuestionMark from '@/src/components/icons/QuestionMark'
import ToggleButton from '@/src/components/interactivity/ToggleButton'
import ToggleItem from '@/src/components/interactivity/ToggleItem'
import ToggleSpin from '@/src/components/interactivity/ToggleSpin'
import { CasinoSchemaType } from '@/src/schemas/casino'
import { AlertCircle, ChevronDown } from 'lucide-react'
import { PortableTextBlock } from 'next-sanity'
import Link from 'next/link'
import Button from '../content/Button'

export default function CasinoList({
  casinos,
  title,
  description,
  itemComponent,
  categories,
}: {
  casinos: CasinoSchemaType[]
  title: string
  description: PortableTextBlock[]
  itemComponent: typeof CasinoCard
  categories: { value: string }[]
}) {
  const year = new Date().getFullYear()
  const ItemComponent = itemComponent
  const casinosWithIndexes = casinos
    .filter((casino) => !casino.excludeFromToplists)
    .map((casino, index) => ({
      ...casino,
      index,
    }))
  const initialCasinos = casinosWithIndexes.slice(0, 12)
  const remainingCasinos = casinosWithIndexes.slice(12)

  return (
    <>
      <div className="py-1">
        <ToggleButton
          id={'toplist-ad-information'}
          role={'button'}
          className="w-full"
          label={'Annonsinformation'}
        >
          <div className="ml-auto flex cursor-pointer justify-end text-sm items-center gap-1 py-2 text-2xs text-slate-600">
            <AlertCircle className="size-3" />
            Annonsinformation
          </div>
        </ToggleButton>
        <ToggleItem id={'toplist-ad-information'}>
          <p className="rounded-md bg-white mb-2 px-3 py-4 text-xs italic text-gray-700">
            Casinogringos.se är en jämförelsetjänst för online casinon och sidan
            innehåller reklamlänkar. När du klickar dig vidare till ett casino
            via oss kan vi därför komma att erhålla provision för detta från
            operatören, dock utan att det medför någon som helst kostnad för
            dig. Vårt dedikerade team har granskat samtliga casinon noggrant och
            endast de som uppfyller våra krav på säkerhet och kvalitet har
            tagits med i våra jämförelser.
          </p>
        </ToggleItem>
      </div>
      <div className="border border-slate-200 rounded-md mb-3">
        <ToggleButton
          id={'varfor-oss'}
          role={'button'}
          className="w-full"
          label={'Varför oss?'}
        >
          <div className="flex items-center px-4 py-2">
            <div className="flex items-center gap-2 flex-grow">
              <QuestionMark size={15} />
              <span className="font-semibold text-sm">Varför oss?</span>
            </div>
            <ToggleSpin id={'varfor-oss'}>
              <ChevronDown />
            </ToggleSpin>
          </div>
        </ToggleButton>
        <ToggleItem id={'varfor-oss'}>
          <p className="p-4 pt-2 !text-sm text-slate-600">
            Allt vårt innehåll genomgår en noggrann och detaljerad process för
            att säkerställa att all information vi publicerar stämmer och är
            tillförlitlig. Varje artikel, guide och recension granskas av våra{' '}
            <Link prefetch={false} href="/om-oss" className="text-blue-500">
              casinoexperter
            </Link>{' '}
            med lång erfarenhet. Vi arbetar opartiskt och utan påverkan från
            externa parter, vilket gör att vi kan erbjuda objektiva bedömningar
            och rekommendationer som våra läsare kan lita på. Vi strävar efter
            att hålla en hög standard för att ge den mest transparenta och
            uppdaterade informationen inom området.
          </p>
        </ToggleItem>
      </div>
      <div className="relative flex w-full flex-col-reverse lg:flex-row">
        <div className="pr-8 lg:pr-0">
          <Heading
            level={2}
            sizes={[6, 6, 6]}
            className="mb-0 !mt-1 font-semibold"
            text={`${title}`}
          />
          <p className="text-gray-600 mb-5 mt-1 text-sm lg:mb-6">
            Alla casinon är licenserade och granskade av våra experter
            <CheckBadgeIcon className="ml-1 inline-block size-4 text-green-600" />
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
        {initialCasinos.map((casino) => (
          <ItemComponent
            key={`casino-${casino._id}-${casino.index}`}
            casino={casino}
            index={casino.index}
            categories={categories}
          />
        ))}
      </div>
      <ToggleItem id={'show-more-casinos'} hideFromDom>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {remainingCasinos.map((casinoPage) => (
            <ItemComponent
              key={`casino-${casinoPage._id}-${casinoPage.index}`}
              casino={casinoPage}
              index={casinoPage.index}
              categories={categories}
            />
          ))}
        </div>
      </ToggleItem>
      <div className="flex items-center justify-center w-full mt-10">
        <ToggleButton
          id={'show-more-casinos'}
          role={'button'}
          label={'Visa fler casinon'}
          variant="primary"
          hide
        >
          Visa fler casinon
        </ToggleButton>
      </div>
    </>
  )
}
