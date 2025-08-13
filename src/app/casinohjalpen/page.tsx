import { getAllCasinoPages } from '@/src/lib/api'
import dynamicComponent from 'next/dynamic'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'

const CasinoHelperPage = dynamicComponent(
  () => import('@/src/app/CasinoHelperPage')
)

export const metadata = {
  title: 'Casinohjälpen - Ett verktyg för att hitta rätt casino',
  description:
    'Casinohjälpen är vårt egna verktyg som hjälper spelare att hitta rätt online casino. Svara på frågorna för att se ditt resultat.',
}

const Page = async () => {
  const casinoPages: CasinoPageSchemaType[] = await getAllCasinoPages()

  return <CasinoHelperPage initialCasinoPages={casinoPages} />
}

export default Page
