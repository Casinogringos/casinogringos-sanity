'use client'

import CasinoCard from '@/src/components/casino/CasinoCard'
import Heading from '@/src/components/content/Heading'
import CheckBadgeIcon from '@/src/components/icons/CheckBadgeIcon'
import QuestionMark from '@/src/components/icons/QuestionMark'
import ToggleButton from '@/src/components/interactivity/ToggleButton'
import ToggleItem from '@/src/components/interactivity/ToggleItem'
import ToggleSpin from '@/src/components/interactivity/ToggleSpin'
import { CasinoSchemaType } from '@/src/schemas/casino'
import CasinoService from '@/src/services/CasinoService'
import {
  AlertCircle,
  ArrowUpDown,
  ChevronDown,
  Coins,
  CreditCard,
  ListFilter,
} from 'lucide-react'
import { PortableTextBlock } from 'next-sanity'
import Link from 'next/link'
import { useEffect, useMemo, useState, useTransition } from 'react'

const FILTER_OPTIONS = [
  { value: 'roi', label: 'Bäst just nu' },
  { value: 'bonus', label: 'Högst bonus' },
  { value: 'rating', label: 'Högst betyg' },
  { value: 'freespins', label: 'Flest freespins' },
  { value: 'wagering', label: 'Lägst omsättningskrav' },
] as const

const MINIMUM_DEPOSIT_OPTIONS = [
  { id: '0-50', label: '0-50 kr', min: 0, max: 50 },
  { id: '51-100', label: '51-100 kr', min: 51, max: 100 },
  { id: '101-200', label: '101-200 kr', min: 101, max: 200 },
] as const

type FilterKey = (typeof FILTER_OPTIONS)[number]['value']

export default function CasinoList({
  casinos,
  title,
  categories,
  pathname,
}: {
  casinos: CasinoSchemaType[]
  title?: string
  description: PortableTextBlock[]
  pathname?: string
  categories?: { value: string }[]
}) {
  const year = new Date().getFullYear()
  const casinoService = useMemo(() => new CasinoService(), [])
  const [activeFilter, setActiveFilter] = useState<FilterKey>('roi')
  const [showFilters, setShowFilters] = useState(false)
  const [showSortButtons, setShowSortButtons] = useState(false)
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    string[]
  >([])
  const [selectedMinimumDeposits, setSelectedMinimumDeposits] = useState<
    string[]
  >([])
  const [isPending, startTransition] = useTransition()
  const categoryList = categories ?? []
  const showMoreId = `show-more-casinos-${(pathname ?? 'default').replace(
    /[^a-zA-Z0-9-_]/g,
    '-'
  )}`
  const filterPanelId = `${showMoreId}-filter-panel`
  const filterButtonsId = `${showMoreId}-filter-buttons`

  const baseCasinos = useMemo(() => {
    return casinos.reduce<
      {
        casino: CasinoSchemaType
        originalIndex: number
        methodSlugs: Set<string>
        minimumDeposit: number | null
      }[]
    >((acc, casino, originalIndex) => {
      if (casino.excludeFromToplists) return acc
      const methodSlugs = new Set(
        [
          ...(casino.availableDepositMethods ?? []),
          ...(casino.availableWithdrawalMethods ?? []),
        ]
          .map((method) => method?.slug?.current)
          .filter((slug): slug is string => Boolean(slug))
      )
      const minimumDeposit = Number.isFinite(casino.minimumDeposit)
        ? casino.minimumDeposit
        : null
      acc.push({
        casino,
        originalIndex,
        methodSlugs,
        minimumDeposit,
      })
      return acc
    }, [])
  }, [casinos])

  const paymentMethodOptions = useMemo(() => {
    const methodMap = new Map<string, string>()
    baseCasinos.forEach(({ casino }) => {
      const methods = [
        ...(casino.availableDepositMethods ?? []),
        ...(casino.availableWithdrawalMethods ?? []),
      ]
      methods.forEach((method) => {
        const slug = method?.slug?.current
        if (!slug || methodMap.has(slug)) return
        const label = method?.name?.trim()
        methodMap.set(slug, label && label.length > 0 ? label : slug)
      })
    })

    return Array.from(methodMap, ([slug, label]) => ({
      slug,
      label,
    })).sort((a, b) => a.label.localeCompare(b.label))
  }, [baseCasinos])

  const minimumDepositRanges = useMemo(() => {
    return new Map(MINIMUM_DEPOSIT_OPTIONS.map((option) => [option.id, option]))
  }, [])

  const selectedMethodSet = useMemo(
    () => new Set(selectedPaymentMethods),
    [selectedPaymentMethods]
  )

  const selectedMinimumDepositSet = useMemo(
    () => new Set(selectedMinimumDeposits),
    [selectedMinimumDeposits]
  )

  useEffect(() => {
    const allowedSlugs = new Set(
      paymentMethodOptions.map((option) => option.slug)
    )
    setSelectedPaymentMethods((current) => {
      const next = current.filter((slug) => allowedSlugs.has(slug))
      return next.length === current.length ? current : next
    })
  }, [paymentMethodOptions])

  const filteredCasinos = useMemo(() => {
    return baseCasinos.filter(
      ({ methodSlugs, minimumDeposit }) => {
        if (selectedMethodSet.size > 0) {
          let matchesPaymentMethods = false
          for (const slug of selectedMethodSet) {
            if (methodSlugs.has(slug)) {
              matchesPaymentMethods = true
              break
            }
          }
          if (!matchesPaymentMethods) return false
        }

        if (selectedMinimumDepositSet.size > 0) {
          if (minimumDeposit == null) return false
          let matchesDeposit = false
          for (const rangeId of selectedMinimumDepositSet) {
            const range = minimumDepositRanges.get(rangeId)
            if (!range) continue
            if (range.max == null) {
              if (minimumDeposit >= range.min) {
                matchesDeposit = true
                break
              }
            } else if (
              minimumDeposit >= range.min &&
              minimumDeposit <= range.max
            ) {
              matchesDeposit = true
              break
            }
          }
          if (!matchesDeposit) return false
        }

        return true
      }
    )
  }, [
    baseCasinos,
    minimumDepositRanges,
    selectedMethodSet,
    selectedMinimumDepositSet,
  ])

  const casinosWithIndexes = useMemo(
    () =>
      [...filteredCasinos]
        .sort((a, b) => {
          const aRank = a.casino.roiRank ?? Number.MAX_SAFE_INTEGER
          const bRank = b.casino.roiRank ?? Number.MAX_SAFE_INTEGER
          if (aRank !== bRank) return aRank - bRank
          return a.originalIndex - b.originalIndex
        })
        .map(({ casino, originalIndex }, index) => ({
          ...casino,
          index,
          originalIndex,
        })),
    [filteredCasinos]
  )

  const casinoMetrics = useMemo(() => {
    const toNumber = (value: unknown) => {
      if (value == null) return null
      const numeric = typeof value === 'number' ? value : Number(value)
      return Number.isFinite(numeric) ? numeric : null
    }

    const getMaxValue = (values: Array<unknown>) => {
      return values.reduce<number | null>((max, value) => {
        const numeric = toNumber(value)
        if (numeric == null) return max
        return max == null || numeric > max ? numeric : max
      }, null)
    }

    return baseCasinos.reduce<
      Record<
        string,
        {
          bonusAmount: number | null
          rating: number | null
          freeSpins: number | null
          wageringRequirements: number | null
        }
      >
    >((acc, { casino }) => {
      const bonusCategory = casinoService.chooseBonusCategory({
        categories: categoryList,
        casino,
      })
      const bonus = bonusCategory?.value
        ? casinoService.getBonus({
            casino,
            category: bonusCategory,
          })
        : null
      const { finalRating } = casinoService.getCasinoRatings({ casino })

      acc[casino._id] = {
        bonusAmount: toNumber(bonus?.bonusAmountRange?.max),
        rating: toNumber(finalRating),
        freeSpins: getMaxValue(
          (casino.freeSpins ?? []).map((spin) => spin?.numberOfFreeSpins)
        ),
        wageringRequirements: toNumber(bonus?.wageringRequirements),
      }
      return acc
    }, {})
  }, [baseCasinos, casinoService, categoryList])

  const sortedCasinos = useMemo(() => {
    if (activeFilter === 'roi') return casinosWithIndexes

    const compareByFilter = (
      a: (typeof casinosWithIndexes)[number],
      b: (typeof casinosWithIndexes)[number]
    ) => {
      const metricsA = casinoMetrics[a._id]
      const metricsB = casinoMetrics[b._id]

      const getValue = (
        metrics: (typeof casinoMetrics)[string] | undefined
      ) => {
        if (!metrics) return null
        switch (activeFilter) {
          case 'bonus':
            return metrics.bonusAmount
          case 'rating':
            return metrics.rating
          case 'freespins':
            return metrics.freeSpins
          case 'wagering':
            return metrics.wageringRequirements
          default:
            return null
        }
      }

      const aVal = getValue(metricsA)
      const bVal = getValue(metricsB)
      const aHasValue = aVal != null && !Number.isNaN(aVal)
      const bHasValue = bVal != null && !Number.isNaN(bVal)

      if (aHasValue && bHasValue) {
        if (aVal !== bVal) {
          return activeFilter === 'wagering'
            ? (aVal as number) - (bVal as number)
            : (bVal as number) - (aVal as number)
        }
      } else if (aHasValue && !bHasValue) {
        return -1
      } else if (!aHasValue && bHasValue) {
        return 1
      }

      const aRank = a.roiRank ?? Number.MAX_SAFE_INTEGER
      const bRank = b.roiRank ?? Number.MAX_SAFE_INTEGER
      if (aRank !== bRank) return aRank - bRank

      return (
        (a.originalIndex ?? Number.MAX_SAFE_INTEGER) -
        (b.originalIndex ?? Number.MAX_SAFE_INTEGER)
      )
    }

    return [...casinosWithIndexes]
      .sort(compareByFilter)
      .map((casino, index) => ({ ...casino, index }))
  }, [activeFilter, casinoMetrics, casinosWithIndexes])

  const initialCasinos = sortedCasinos.slice(0, 12)
  const remainingCasinos = sortedCasinos.slice(12)
  const skeletonCount = Math.min(initialCasinos.length || 12, 12)
  const hasResults = sortedCasinos.length > 0

  const handleFilterChange = (nextFilter: FilterKey) => {
    if (nextFilter === activeFilter) return
    startTransition(() => setActiveFilter(nextFilter))
  }

  const handlePaymentMethodToggle = (slug: string) => {
    startTransition(() =>
      setSelectedPaymentMethods((current) =>
        current.includes(slug)
          ? current.filter((item) => item !== slug)
          : [...current, slug]
      )
    )
  }

  const handleMinimumDepositToggle = (rangeId: string) => {
    startTransition(() =>
      setSelectedMinimumDeposits((current) =>
        current.includes(rangeId)
          ? current.filter((item) => item !== rangeId)
          : [...current, rangeId]
      )
    )
  }

  const handleClearFilters = () => {
    if (
      selectedPaymentMethods.length === 0 &&
      selectedMinimumDeposits.length === 0
    ) {
      return
    }
    startTransition(() => {
      setSelectedPaymentMethods([])
      setSelectedMinimumDeposits([])
    })
  }

  const activeFilterCount =
    selectedPaymentMethods.length + selectedMinimumDeposits.length

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
      <div className="border border-slate-200 rounded-md mb-4 md:mb-5">
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
            sizes={[5, 6, 6]}
            className="mb-0 !mt-1 font-semibold"
            text={`${title} ${year}`}
          />
          <p className="text-gray-600 mb-5 mt-1 !text-[14px] lg:mb-4">
            Alla casinon är licenserade och granskade av våra experter
            <CheckBadgeIcon className="ml-1 inline-block size-4 text-green-600" />
          </p>
        </div>
      </div>
      <div className="mb-4 rounded-md border border-slate-200 bg-white px-3 pt-3 pb-3 md:px-3 md:pt-3 md:pb-3">
        <div className="flex flex-col gap-x-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between gap-3 md:order-2 md:ml-auto md:justify-end">
            <button
              type="button"
              onClick={() => setShowSortButtons((open) => !open)}
              className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 md:hidden"
              aria-expanded={showSortButtons}
              aria-controls={filterButtonsId}
            >
              <ArrowUpDown className="size-4 text-slate-500" />
              Sortera
            </button>
            <button
              type="button"
              onClick={() => setShowFilters((open) => !open)}
              className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              aria-expanded={showFilters}
              aria-controls={filterPanelId}
            >
              <ListFilter className="size-4 text-slate-500" />
              Filter
              {activeFilterCount > 0 ? (
                <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-slate-200 px-1.5 text-xs text-slate-700">
                  {activeFilterCount}
                </span>
              ) : null}
              <ChevronDown
                className={`size-4 text-slate-500 transition ${
                  showFilters ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
          <div className="overflow-hidden md:order-1 md:mt-0">
            <div
              id={filterButtonsId}
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out md:block ${
                showSortButtons ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              } md:grid-rows-none`}
            >
              <div
                className={`min-h-0 overflow-hidden transition-[opacity,transform] duration-200 ease-out md:opacity-100 md:translate-y-0 md:pointer-events-auto ${
                  showSortButtons
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-1 pointer-events-none'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 pt-3 md:pt-0">
                  {FILTER_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleFilterChange(option.value)}
                      className={`rounded-md border px-3 py-1.5 md:py-2 text-sm transition cursor-pointer ${
                        activeFilter === option.value
                          ? 'border-slate-500 bg-slate-100 text-darklight shadow-[0_4px_12px_rgba(59,130,246,0.15)]'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-slate-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            id={filterPanelId}
            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
              showFilters ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div
              className={`min-h-0 overflow-hidden transition-[opacity,transform] duration-200 ease-out ${
                showFilters
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-1 pointer-events-none'
              }`}
            >
              <div className="mt-3 max-h-[370px] overflow-y-auto rounded-md border border-dashed border-slate-200 bg-slate-50/60 p-3 pb-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={handleClearFilters}
                      disabled={activeFilterCount === 0}
                      className="text-xs font-semibold text-slate-600 transition hover:text-slate-800 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Rensa filter
                    </button>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500">
                      <CreditCard className="size-4" />
                      Betalningsmetoder
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                      {paymentMethodOptions.length > 0 ? (
                        paymentMethodOptions.map((method) => (
                          <label
                            key={method.slug}
                            className="flex items-center gap-2 text-sm text-slate-700"
                          >
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-slate-300 text-darklight focus:ring-slate-400"
                              checked={selectedPaymentMethods.includes(
                                method.slug
                              )}
                              onChange={() =>
                                handlePaymentMethodToggle(method.slug)
                              }
                            />
                            {method.label}
                          </label>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500">
                          Inga betalningsmetoder hittades.
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="border-t border-dashed border-slate-200 pt-4">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500">
                      <Coins className="size-4" />
                      Minsta insättning
                    </div>
                    <div className="mt-2 grid gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                      {MINIMUM_DEPOSIT_OPTIONS.map((option) => (
                        <label
                          key={option.id}
                          className="flex items-center gap-2 text-sm text-slate-700"
                        >
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300 text-darklight focus:ring-slate-400"
                            checked={selectedMinimumDeposits.includes(option.id)}
                            onChange={() => handleMinimumDepositToggle(option.id)}
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative" aria-busy={isPending}>
        {isPending ? (
          <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <li
                key={`casino-skeleton-${index}`}
                className="rounded-md border border-slate-200 bg-white p-3.5 shadow-2xl"
              >
                <div className="animate-pulse space-y-3">
                  <div className="h-28 rounded-md bg-slate-200" />
                  <div className="h-4 w-2/3 rounded bg-slate-200" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-20 rounded-md bg-slate-200" />
                    <div className="h-20 rounded-md bg-slate-200" />
                  </div>
                  <div className="h-12 rounded-md bg-slate-200" />
                  <div className="h-9 rounded-md bg-slate-200" />
                </div>
              </li>
            ))}
          </ol>
        ) : hasResults ? (
          <>
            <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
              {initialCasinos.map((casino) => (
                <CasinoCard
                  key={`casino-${casino._id}-${casino.index}`}
                  casino={casino}
                  pathname={pathname}
                  index={casino.index}
                  categories={categoryList}
                />
              ))}
            </ol>
            <ToggleItem id={showMoreId} hideFromDom>
              <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {remainingCasinos.map((casinoPage) => (
                  <CasinoCard
                    key={`casino-${casinoPage._id}-${casinoPage.index}`}
                    casino={casinoPage}
                    index={casinoPage.index}
                    pathname={pathname}
                    categories={categoryList}
                  />
                ))}
              </ol>
            </ToggleItem>
            <div className="flex items-center justify-center w-full mt-10">
              <ToggleButton
                id={showMoreId}
                role={'button'}
                label={'Visa fler casinon'}
                variant="primary"
                hide
              >
                Visa fler casinon
              </ToggleButton>
            </div>
          </>
        ) : (
          <div className="rounded-md border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
            <p>Inga casinon matchar dina filter.</p>
            {activeFilterCount > 0 ? (
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-3 inline-flex items-center justify-center rounded-md border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Rensa filter
              </button>
            ) : null}
          </div>
        )}
      </div>
    </>
  )
}
