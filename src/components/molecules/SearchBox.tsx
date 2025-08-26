'use client'

import { useEffect, useMemo, useState } from 'react'
import { SearchSchemaType } from '@/src/schemas/search'
import { ArrowRight, Search } from 'lucide-react'
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
import SubPageService from '@/src/services/SubPageService'
import SlotPageService from '@/src/services/SlotPageService'
import GuidePageService from '@/src/services/GuidePageService'
import NewsPageService from '@/src/services/NewsPageService'
import CasinoPageService from '@/src/services/CasinoPageService'
import Image from 'next/image'

const pageService = new SubPageService()

const SearchBox = () => {
    const [pages, setPages] = useState<SubPagePreviewSchemaType[] | SlotPagePreviewSchemaType[] | GuidePagePreviewSchemaType[] | NewsPagePreviewSchemaType[] | CasinoPagePreviewSchemaType[] | null>(null)
    const [filteredResults, setFilteredResults] = useState<FilteredSearchResultSchemaType[] | null>(null)
    const resultGroups: Record<string, FilteredSearchResultSchemaType[]> = useMemo(() => filteredResults?.reduce((acc, item) => {
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
    }) ?? {}, [filteredResults])
    console.log('resultGroups', resultGroups)
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
            const modified = pageService.getModifiedDate(clonedRecord)
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
            {filteredResults && filteredResults.length > 0 && (<div className='bg-white rounded-md max-h-[400px] p-4 overflow-y-scroll'>
                <div className='mb-4'>
                    {resultGroups && resultGroups?.['casino-pages']?.length > 0 && (
                        <Heading text="Casinon" level={3} size={5} className='mb-3' />
                    )}
                    {resultGroups?.['casino-pages']?.map((item, index) => (
                        <div key={`${item.slug.current}`} className='border-b border-slate-200 hover:bg-slate-100 p-4 pl-0'>
                            <Link className='flex items-center justify-start' href={item.slug.current}>
                                <Image
                                    src={item.featuredImage.src}
                                    alt={item.featuredImage.alt}
                                    width={50}
                                    height={50}
                                    className='rounded-md mr-2'
                                />
                                <div className='flex-grow'>
                                    <Heading text={item.title} level={4} size={2} className='!font-normal !text-md' />
                                    <Date className='text-slate-500 text-sm' dateString={item.modifiedAt} />
                                </div>
                                <div className='flex-shrink-0 rounded-full bg-slate-200 p-2'>
                                    <ArrowRight size={15} />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className='mb-4'>
                    {resultGroups && resultGroups?.['guide-pages']?.length > 0 && (
                        <Heading text="Guidor" level={3} size={5} className='mb-3' />
                    )}
                    {resultGroups?.['guide-pages']?.map((item, index) => (
                        <div key={`${item.slug}-${index}`} className='border-b border-slate-200 hover:bg-slate-100 p-4 pl-0'>
                            <Link href={item.slug.current} className='flex items-center justify-start'>
                                <Image
                                    src={item.featuredImage.src}
                                    alt={item.featuredImage.alt}
                                    width={50}
                                    height={50}
                                    className='rounded-md mr-2'
                                />
                                <div className='flex-grow'>
                                    <Heading text={item.title} level={4} size={2} className='!font-normal !text-md' />
                                    <Date dateString={item.modifiedAt} className='text-slate-500 text-sm' />
                                </div>
                                <div className='flex-shrink-0 rounded-full bg-slate-200 p-2'>
                                    <ArrowRight size={15} />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className='mb-4'>
                    {resultGroups && resultGroups?.['news-pages']?.length > 0 && (
                        <Heading text="Nyheter" level={3} size={5} className='mb-3' />
                    )}
                    {resultGroups?.['news-pages']?.map((item, index) => (
                        <div key={`${item.slug}-${index}`} className='border-b border-slate-200 hover:bg-slate-100 p-4 pl-0'>
                            <Link href={item.slug.current} className='flex items-center justify-start'>
                                <Image
                                    src={item.featuredImage.src}
                                    alt={item.featuredImage.alt}
                                    width={50}
                                    height={50}
                                    className='rounded-md mr-2'
                                />
                                <div className='flex-grow'>
                                    <Heading text={item.title} level={4} size={2} className='!font-normal !text-md' />
                                    <Date dateString={item.modifiedAt} className='text-slate-500 text-sm' />
                                </div>
                                <div className='flex-shrink-0 rounded-full bg-slate-200 p-2'>
                                    <ArrowRight size={15} />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className='mb-4'>
                    {resultGroups && resultGroups?.['slot-pages']?.length > 0 && (
                        <Heading text="Sloter" level={3} size={5} className='mb-3' />
                    )}
                    {resultGroups?.['slot-pages']?.map((item, index) => (
                        <div key={`${item.slug}-${index}`} className='border-b border-slate-200 hover:bg-slate-100 p-4 pl-0'>
                            <Link href={item.slug.current} className='flex items-center justify-start'>
                                <Image
                                    src={item.featuredImage.src}
                                    alt={item.featuredImage.alt}
                                    width={50}
                                    height={50}
                                    className='rounded-md mr-2'
                                />
                                <div className='flex-grow'>
                                    <Heading text={item.title} level={4} size={2} className='!font-normal !text-md' />
                                    <Date dateString={item.modifiedAt} className='text-slate-500 text-sm' />
                                </div>
                                <div className='flex-shrink-0 rounded-full bg-slate-200 p-2'>
                                    <ArrowRight size={15} />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className='mb-4'>
                    {resultGroups && resultGroups?.['pages']?.length > 0 && (
                        <Heading text="Sidor" level={3} size={5} className='mb-3' />
                    )}
                    {resultGroups?.['pages']?.map((item, index) => (
                        <div key={`${item.slug}-${index}`} className='border-b border-slate-200 hover:bg-slate-100 p-4 pl-0'>
                            <Link href={item.slug.current} className='flex items-center justify-start'>
                                <Image
                                    src={item.featuredImage.src}
                                    alt={item.featuredImage.alt}
                                    width={50}
                                    height={50}
                                    className='rounded-md mr-2'
                                />
                                <div className='flex-grow'>
                                    <Heading text={item.title} level={4} size={2} className='!font-normal !text-md' />
                                    <Date dateString={item.modifiedAt} className='text-slate-500 text-sm' />
                                </div>
                                <div className='flex-shrink-0 rounded-full bg-slate-200 p-2'>
                                    <ArrowRight size={15} />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            )}
        </>
    )
}

export default SearchBox
