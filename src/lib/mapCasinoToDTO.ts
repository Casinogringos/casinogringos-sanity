import { CasinoSchemaType } from '@/src/schemas/casino'
import CasinoService from '@/src/services/CasinoService'
import {
  CasinoCardDTO,
  PaymentMethodOption,
} from '@/src/types/casinoCardDTO'

const casinoService = new CasinoService()

export function mapCasinoToDTO(
  casino: CasinoSchemaType,
  categories: { value: string }[]
): CasinoCardDTO {
  const { finalRating } = casinoService.getCasinoRatings({ casino })
  const bonusCategory = casinoService.chooseBonusCategory({
    categories,
    casino,
  })
  const affLinkSlug = casinoService.getAffLinkSlug({
    bonusCategory,
    casino,
  })

  const getBonusAmount = (): number | null => {
    switch (bonusCategory.value) {
      case 'casino-bonus':
        return casino.casinoBonuses?.[0]?.bonusAmountRange?.max ?? null
      case 'odds-bonus':
        return casino.oddsBonuses?.[0]?.bonusAmountRange?.max ?? null
      case 'live-casino-bonus':
        return casino.liveCasinoBonuses?.[0]?.bonusAmountRange?.max ?? null
      default:
        return casino.casinoBonuses?.[0]?.bonusAmountRange?.max ?? null
    }
  }

  const getWageringRequirementsBonus = (): number | null => {
    switch (bonusCategory.value) {
      case 'casino-bonus':
        return casino.casinoBonuses?.[0]?.wageringRequirements ?? null
      case 'odds-bonus':
        return casino.oddsBonuses?.[0]?.wageringRequirements ?? null
      case 'live-casino-bonus':
        return casino.liveCasinoBonuses?.[0]?.wageringRequirements ?? null
      default:
        return casino.casinoBonuses?.[0]?.wageringRequirements ?? null
    }
  }

  const methodSlugs = [
    ...(casino.availableDepositMethods ?? []),
    ...(casino.availableWithdrawalMethods ?? []),
  ]
    .map((method) => method?.slug?.current?.toLowerCase())
    .filter((slug): slug is string => Boolean(slug))

  const methodSlugSet = new Set(methodSlugs)

  const toNumber = (value: unknown): number | null => {
    if (value == null) return null
    const numeric = typeof value === 'number' ? value : Number(value)
    return Number.isFinite(numeric) ? numeric : null
  }

  const bonus = casinoService.getBonus({ casino, category: bonusCategory })
  const maxFreeSpins = (casino.freeSpins ?? []).reduce<number | null>(
    (max, spin) => {
      const n = toNumber(spin?.numberOfFreeSpins)
      if (n == null) return max
      return max == null || n > max ? n : max
    },
    null
  )

  return {
    _id: casino._id,
    name: casino.name,
    brandColor: casino.brandColor,
    logo: {
      src: casino.logo?.src,
      altText: casino.logo?.altText,
    },
    parentCasinoPageSlug: casino.parentCasinoPageSlug,
    affLinkSlug: affLinkSlug ?? null,
    swedishLicense: casino.swedishLicense,
    defaultBonusText: casino.defaultBonusText,
    roiRank: casino.roiRank,

    bonusAmount: getBonusAmount(),
    wageringRequirementsBonus: getWageringRequirementsBonus(),
    numberOfFreeSpins: casino.freeSpins?.[0]?.numberOfFreeSpins ?? null,
    wageringRequirementsFreespins:
      casino.freeSpins?.[0]?.wageringRequirements ?? null,
    finalRating:
      typeof finalRating === 'string' ? Number(finalRating) : finalRating,
    hasSwish: methodSlugSet.has('swish'),
    hasTrustly: methodSlugSet.has('trustly'),

    methodSlugs: [...new Set(methodSlugs)],
    minimumDeposit: Number.isFinite(casino.minimumDeposit)
      ? casino.minimumDeposit
      : null,

    terms: casino.terms,

    sortMetrics: {
      bonusAmount: toNumber(bonus?.bonusAmountRange?.max),
      rating: toNumber(finalRating),
      freeSpins: maxFreeSpins,
      wageringRequirements: toNumber(bonus?.wageringRequirements),
    },
  }
}

export function extractPaymentMethodOptions(
  casinos: CasinoSchemaType[]
): PaymentMethodOption[] {
  const methodMap = new Map<string, string>()

  for (const casino of casinos) {
    if (casino.excludeFromToplists) continue
    const methods = [
      ...(casino.availableDepositMethods ?? []),
      ...(casino.availableWithdrawalMethods ?? []),
    ]
    for (const method of methods) {
      const slug = method?.slug?.current
      if (!slug || methodMap.has(slug)) continue
      const label = method?.name?.trim()
      methodMap.set(slug, label && label.length > 0 ? label : slug)
    }
  }

  return Array.from(methodMap, ([slug, label]) => ({ slug, label })).sort(
    (a, b) => a.label.localeCompare(b.label)
  )
}
