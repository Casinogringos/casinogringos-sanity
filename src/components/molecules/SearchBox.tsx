'use client'

import { useEffect, useMemo, useState } from 'react'
import { SearchSchemaType } from '@/src/schemas/search'
import { Search } from 'lucide-react'
import Fuse from 'fuse.js'
import Link from 'next/link'
import Heading from '@/src/components/atoms/Heading'
import Date from '@/src/components/atoms/Date'
import { SubPagePreviewSchemaType } from '@/src/schemas/subPagePreview'
import { SlotPagePreviewSchemaType } from '@/src/schemas/slotPagePreview'
import { GuidePagePreviewSchemaType } from '@/src/schemas/guidePagePreview'
import { NewsPagePreviewSchemaType } from '@/src/schemas/newsPagePreview'
import { CasinoPagePreviewSchemaType } from '@/src/schemas/casinoPagePreview'
import { FilteredSearchResultSchemaType } from '@/src/schemas/filteredSearchResult'
import { id } from 'zod/v4/locales'
import _ from 'lodash'

const SearchBox = () => {
    const [pages, setPages] = useState<SubPagePreviewSchemaType[] | SlotPagePreviewSchemaType[] | GuidePagePreviewSchemaType[] | NewsPagePreviewSchemaType[] | CasinoPagePreviewSchemaType[] | null>(null)
    console.log('pages', pages)
    const [filteredResults, setFilteredResults] = useState<FilteredSearchResultSchemaType[] | null>(null)
    const resultGroups = useMemo(() => filteredResults?.reduce((acc, item) => {
        if (!item) return acc
        const newItem = {
            _type: item._type,
            title: item.title,
            slug: { ...item.slug },
            featuredImage: { ...item.featuredImage },
            modifiedAt: item.modifiedAt,
        }
        acc[item._type].push(newItem)
        return acc
    }, {
        'casino-pages': [],
        'guide-pages': [],
        'news-pages': [],
        'slot-pages': [],
        'pages': [],
    }) ?? [], [filteredResults])
    useEffect(() => {
        console.log('resultGroups after grouping:', resultGroups);
    }, [resultGroups]);
    console.log('resultGroups', resultGroups)
    console.log('filteredResults', filteredResults)
    const [query, setQuery] = useState('')
    const [didFetch, setDidFetch] = useState(false)
    useEffect(() => {
        if (didFetch) return
        setDidFetch(true)
        const fetchData = async () => {
            const res = await fetch('/api/search')
            const data = await res.json()
            setPages(data)
        }
        fetchData()
    }, [])
    useEffect(() => {
        console.log('query', query)
        if (query === '') {
            setFilteredResults(null)
            return
        }
        if (!pages) return
        const fuse = new Fuse(pages, {
            keys: ['title', 'slug', 'featuredImage.alt'],
            includeScore: true,
            threshold: 0.2,
        })
        const searchResults = fuse.search(query)
        const filteredResults = searchResults.map((result) => {
            const record = pages?.find((item) => item.slug.current === result.item.slug.current)
            const clonedRecord = _.cloneDeep(record)
            const featuredImage = clonedRecord?.featuredImage
            const rawModifiedAt = clonedRecord?.originalModifiedAt ?? clonedRecord?._updatedAt
            const modified = rawModifiedAt instanceof Date ? rawModifiedAt.toISOString() : rawModifiedAt
            console.log('record', clonedRecord._updatedAt, clonedRecord.originalModifiedAt)
            return {
                _type: record?._type,
                title: record?.title,
                slug: { ...record.slug },
                featuredImage,
                modifiedAt: modified,
            }
        })
        setFilteredResults(filteredResults)
    }, [query])

    return (
        <>
            <div className="bg-white rounded-md flex items-stretch mb-2">
                <div className='bg-slate-300 w-[70px] rounded-l-md flex items-center justify-center'>
                    <Search className='text-white' />
                </div>
                <input className='h-[70px] px-4 w-full text-slate-500 outline-none' type="text" placeholder="Sök" onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className='bg-white rounded-md max-h-[400px] p-4 overflow-y-scroll'>
                {resultGroups && resultGroups?.['casino-pages']?.length > 0 && (
                    <Heading text="Casinon" level={3} size={5} className='mb-3' />
                )}
                {resultGroups?.['casino-pages']?.map((item, index) => (
                    <div key={`${item.slug.current}`} className='border-b border-slate-200 p-4'>
                        <Link href={item.slug.current}>
                            <Heading text={item.title} level={4} size={2} className='!font-normal !text-md' />
                            <Date dateString={item.modifiedAt} />
                        </Link>
                    </div>
                ))}
                {resultGroups && resultGroups?.['guide-pages']?.length > 0 && (
                    <Heading text="Guidor" level={3} size={5} className='mb-3' />
                )}
                {resultGroups?.['guide-pages']?.map((item, index) => (
                    <div key={`${item.slug}-${index}`}>
                        <Link href={item.slug.current}>
                            <Heading text={item.title} level={4} size={2} className='!font-normal !text-md' />
                            <Date dateString={item.modifiedAt} />
                        </Link>
                    </div>
                ))}
                {resultGroups && resultGroups?.['news-pages']?.length > 0 && (
                    <Heading text="Nyheter" level={3} size={5} className='mb-3' />
                )}
                {resultGroups?.['news-pages']?.map((item, index) => (
                    <div key={`${item.slug}-${index}`}>
                        <Link href={item.slug.current}>
                            <Heading text={item.title} level={4} size={2} className='!font-normal !text-md' />
                            <Date dateString={item.modifiedAt} />
                        </Link>
                    </div>
                ))}
                {resultGroups && resultGroups?.['slot-pages']?.length > 0 && (
                    <Heading text="Sloter" level={3} size={5} className='mb-3' />
                )}
                {resultGroups?.['slot-pages']?.map((item, index) => (
                    <div key={`${item.slug}-${index}`}>
                        <Link href={item.slug.current}>
                            <Heading text={item.title} level={4} size={2} className='!font-normal !text-md' />
                            <Date dateString={item.modifiedAt} />
                        </Link>
                    </div>
                ))}
                {resultGroups && resultGroups?.['pages']?.length > 0 && (
                    <Heading text="Sidor" level={3} size={5} className='mb-3' />
                )}
                {resultGroups?.['pages']?.map((item, index) => (
                    <div key={`${item.slug}-${index}`}>
                        <Link href={item.slug.current}>
                            <Heading text={item.title} level={4} size={2} className='!font-normal !text-md' />
                            <Date dateString={item.modifiedAt} />
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SearchBox
