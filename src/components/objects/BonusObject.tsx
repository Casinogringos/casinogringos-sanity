import { BonusObjectSchemaType } from '@/src/schemas/bonusObject'
import Link from '@/src/components/content/Link'
import Image from 'next/image'

const BonusObject = ({ object }: { object: BonusObjectSchemaType }) => {
  const { casino, bonus, freeSpins, terms, title, information, buttonText } =
    object
  let getBonusText = () => {
    let bonusText = ''
    if (bonus?.bonusAmountRange) {
      bonusText = `${bonus.bonusAmountRange[1]} kr bonus`
      if (freeSpins) {
        return (bonusText += ` + ${freeSpins.numberOfFreeSpins} freespins`)
      }
    } else {
      return casino.defaultBonusText ?? null
    }
  }
  const bonusText = getBonusText()

  return (
    <div className="not-prose bg-dark p-4 rounded-md flex flex-col items-center">
      <Image
        src={casino.logo.src}
        alt={casino.logo.altText}
        width={100}
        height={100}
        className={'mb-4 rounded-full border-2 border-white'}
      />
      {bonusText && (
        <span className="text-white text-2xl mb-4">{bonusText}</span>
      )}
      <Link
        href={casino.slug.current}
        variant="affiliate"
        className="text-white"
      >
        {buttonText ?? `Till ${casino.name} casino`}
      </Link>
    </div>
  )
}

export default BonusObject
