import Link from '@/src/components/content/Link'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
import { CasinoPagePreviewSchemaType } from '@/src/schemas/casinoPagePreview'
import CasinoService from '@/src/services/CasinoService'

const CasinoTableRow = ({
  casinoPage,
  index,
}: {
  casinoPage: CasinoPageSchemaType | CasinoPagePreviewSchemaType
  index: number
}) => {
  const { casino } = casinoPage
  const casinoService = new CasinoService()
  const bonusString = casinoService.getBonusString({ casino })
  console.log('bonusString', bonusString)

  return (
    <tr>
      <td className="text-center text-slate-500 font-bold">{index + 1}</td>
      <td className="text-center">{casinoPage.title}</td>
      <td className="text-center font-bold">{bonusString}</td>
      <td className="text-center">
        {casinoPage.affLinks?.[0].slug.current && <Link
          href={`/go${casinoPage.affLinks?.[0].slug.current}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          prefetch={false}
          variant={'affiliate'}
          size="sm"
          className="ml-auto"
          plausible={{
            eventName: 'AffiliateClick',
            props: {
              buttonId: casinoPage.title,
              place: 'Content',
            },
          }}
        >
          Till Casinot
        </Link>}
      </td>
    </tr>
  )
}

export default CasinoTableRow
