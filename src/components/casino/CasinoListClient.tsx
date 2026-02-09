'use client'

import CasinoCard from '@/src/components/casino/CasinoCard'
import ToggleButton from '@/src/components/interactivity/ToggleButton'
import ToggleItem from '@/src/components/interactivity/ToggleItem'
import { useAppDispatch } from '@/src/store/hooks'
import { removeToggleId } from '@/src/store/toggleSlice'
import { CasinoCardDTO, PaymentMethodOption } from '@/src/types/casinoCardDTO'
import {
  ArrowUpDown,
  ChevronDown,
  Coins,
  CreditCard,
  ListFilter,
} from 'lucide-react'
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

export default function CasinoListClient({
  casinos,
  paymentMethodOptions,
  pathname,
}: {
  casinos: CasinoCardDTO[]
  paymentMethodOptions: PaymentMethodOption[]
  pathname?: string
}) {
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
  const dispatch = useAppDispatch()

  const showMoreId = `show-more-casinos-${(pathname ?? 'default').replace(
    /[^a-zA-Z0-9-_]/g,
    '-'
  )}`
  const filterPanelId = `${showMoreId}-filter-panel`
  const filterButtonsId = `${showMoreId}-filter-buttons`

  useEffect(() => {
    dispatch(removeToggleId(showMoreId))
  }, [pathname, showMoreId, dispatch])

  const minimumDepositRanges = useMemo(
    () => new Map(MINIMUM_DEPOSIT_OPTIONS.map((option) => [option.id, option])),
    []
  )

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
    return casinos.filter((casino) => {
      if (selectedMethodSet.size > 0) {
        const casinoMethods = new Set(casino.methodSlugs)
        let matchesPaymentMethods = false
        for (const slug of selectedMethodSet) {
          if (casinoMethods.has(slug)) {
            matchesPaymentMethods = true
            break
          }
        }
        if (!matchesPaymentMethods) return false
      }

      if (selectedMinimumDepositSet.size > 0) {
        if (casino.minimumDeposit == null) return false
        let matchesDeposit = false
        for (const rangeId of selectedMinimumDepositSet) {
          const range = minimumDepositRanges.get(rangeId)
          if (!range) continue
          if (range.max == null) {
            if (casino.minimumDeposit >= range.min) {
              matchesDeposit = true
              break
            }
          } else if (
            casino.minimumDeposit >= range.min &&
            casino.minimumDeposit <= range.max
          ) {
            matchesDeposit = true
            break
          }
        }
        if (!matchesDeposit) return false
      }

      return true
    })
  }, [casinos, minimumDepositRanges, selectedMethodSet, selectedMinimumDepositSet])

  const sortedByRoi = useMemo(
    () =>
      [...filteredCasinos]
        .sort((a, b) => {
          const aRank = a.roiRank ?? Number.MAX_SAFE_INTEGER
          const bRank = b.roiRank ?? Number.MAX_SAFE_INTEGER
          return aRank - bRank
        })
        .map((casino, index) => ({ casino, index })),
    [filteredCasinos]
  )

  const sortedCasinos = useMemo(() => {
    if (activeFilter === 'roi') return sortedByRoi

    const compareByFilter = (
      a: (typeof sortedByRoi)[number],
      b: (typeof sortedByRoi)[number]
    ) => {
      const getValue = (c: CasinoCardDTO) => {
        switch (activeFilter) {
          case 'bonus':
            return c.sortMetrics.bonusAmount
          case 'rating':
            return c.sortMetrics.rating
          case 'freespins':
            return c.sortMetrics.freeSpins
          case 'wagering':
            return c.sortMetrics.wageringRequirements
          default:
            return null
        }
      }

      const aVal = getValue(a.casino)
      const bVal = getValue(b.casino)
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

      const aRank = a.casino.roiRank ?? Number.MAX_SAFE_INTEGER
      const bRank = b.casino.roiRank ?? Number.MAX_SAFE_INTEGER
      if (aRank !== bRank) return aRank - bRank

      return a.index - b.index
    }

    return [...sortedByRoi]
      .sort(compareByFilter)
      .map((item, index) => ({ ...item, index }))
  }, [activeFilter, sortedByRoi])

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
              {initialCasinos.map((item) => (
                <CasinoCard
                  key={`casino-${item.casino._id}-${item.index}`}
                  casino={item.casino}
                  pathname={pathname}
                  index={item.index}
                />
              ))}
            </ol>
            <ToggleItem id={showMoreId} hideFromDom>
              <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {remainingCasinos.map((item) => (
                  <CasinoCard
                    key={`casino-${item.casino._id}-${item.index}`}
                    casino={item.casino}
                    index={item.index}
                    pathname={pathname}
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
