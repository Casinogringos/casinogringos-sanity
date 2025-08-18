import Link from '@/src/components/atoms/Link'
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

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{casinoPage.title}</td>
      <td>{bonusString}</td>
      <td>
        <Link
          href={`/go/${casinoPage.slug.current}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          prefetch={false}
          variant={'affiliate'}
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
        </Link>
      </td>
    </tr>
  )
}

export default CasinoTableRow
