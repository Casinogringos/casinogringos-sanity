import { Mail, MessageCircle, Phone } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from '@/src/components/atoms/Link'
import Container from '@/src/components/atoms/Container'
import Heading from '@/src/components/atoms/Heading'
import ProsAndConsBox from '@/src/components/organisms/ProsAndConsBox'
import StarIcon from '@/src/components/icons/StarIcon'
import { CasinoPageSchemaType } from '@/src/schemas'
import CasinoService from '@/src/services/CasinoService'
import { PortableText } from 'next-sanity'
import ToggleObject from '@/src/components/molecules/ToggleObject'

const CasinoInfo = ({
    casinoPage,
}: {
    casinoPage: CasinoPageSchemaType
}) => {
    const { title } = casinoPage
    const casinoService = new CasinoService()
    const { finalRating, validRatings, ratings, ratingKeys } = casinoService.getCasinoRatings({
        casino: casinoPage.casino,
    })
    const { quickFacts } = casinoService.getQuickFacts({
        casino: casinoPage.casino,
    })
    const prosAndConsStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: title,
        review: {
            '@type': 'Review',
            name: `Recension av ${title}`,
            author: {
                '@type': 'Person',
                name: casinoPage.author.firstName + ' ' + casinoPage.author.lastName,
            },
            positiveNotes: {
                '@type': 'ItemList',
                itemListElement: casinoPage.casino.advantages.map(
                    (item, index) => ({
                        '@type': 'ListItem',
                        position: index + 1,
                        name: item,
                    })
                ),
            },
            negativeNotes: {
                '@type': 'ItemList',
                itemListElement: casinoPage.casino.disadvantages.map(
                    (item, index) => ({
                        '@type': 'ListItem',
                        position: index + 1,
                        name: item,
                    })
                ),
            },
        },
    }

    return (
        <div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(prosAndConsStructuredData),
                }}
            />
            {validRatings.length >= 5 && (
                <div className="mx-auto max-w-3xl">
                    <div className="mb-8 w-full rounded-2xl border border-blue100 bg-slate100 pb-6 md:mt-3 md:p-8">
                        <div className="relative mb-8 gap-6 overflow-hidden rounded-t-md bg-darklight p-5 md:overflow-visible md:rounded-md">
                            <Heading
                                className={'-mt-1 text-lg text-white'}
                                level={2}
                                text="Vårt betyg"
                            />
                            <div className="mt-2 flex items-start text-white">
                                <strong className="text-5xl">{finalRating}</strong>
                                <div className="ml-1 mt-0.5 flex gap-1 text-sm font-medium text-slate400">
                                    /5 <StarIcon className="size-5 text-yellow400" />
                                </div>
                                <Image
                                    src={
                                        finalRating >= 4
                                            ? '/gringo-happy.webp'
                                            : '/gringo-neutral.webp'
                                    }
                                    width={160}
                                    height={160}
                                    alt={'Casinogringos mascot'}
                                    className="absolute bottom-0 right-0 z-0 hidden md:block md:w-[200px]"
                                    priority={true}
                                />
                                <Image
                                    src={
                                        finalRating > 3.5
                                            ? '/gringo-happy.webp'
                                            : '/gringo-neutral.webp'
                                    }
                                    width={160}
                                    height={160}
                                    alt={'Casinogringos'}
                                    className="absolute -right-2 bottom-0 z-0 w-[145] md:hidden"
                                    priority={true}
                                />
                            </div>
                            {casinoPage.ratingMotivation && (
                                <div className="mr-28 pt-3 text-sm text-slate200 md:mr-36">
                                    <PortableText
                                        value={casinoPage.ratingMotivation}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="z-1 relative grid grid-cols-1 gap-x-8 gap-y-3 px-8 md:grid-cols-2 md:px-0">
                            {ratingKeys.map(
                                ({ key, label, imgSrc }) => {
                                    const rating = ratings[key] || 0
                                    return (
                                        rating > 0 && (
                                            <div key={key}>
                                                <span className="lg:text-md text-slate-600 mb-2 flex items-center gap-3 text-sm font-normal">
                                                    <Image
                                                        src={imgSrc}
                                                        width={20}
                                                        height={20}
                                                        alt={label}
                                                    />{' '}
                                                    {label}
                                                    <p className="mb-0 ml-auto font-normal text-slate500">
                                                        <strong className="text-lg text-black">
                                                            {ratings[key]}
                                                        </strong>
                                                        /5
                                                    </p>
                                                </span>
                                                <div className="flex h-2 overflow-hidden rounded-md bg-slate300 text-xs">
                                                    <div
                                                        style={{ width: rating * 20 + '%' }}
                                                        className="flex flex-col justify-center whitespace-nowrap bg-green500 text-center text-white shadow-none"
                                                    ></div>
                                                </div>
                                            </div>
                                        )
                                    )
                                }
                            )}
                        </div>
                        <ToggleObject
                            title={'Så fungerar vår betygsättning'}
                            className="mx-5 mt-6 lg:mx-0"
                        >
                            Det finns flera olika parametrar vi tittar på i samband med en
                            recension. För att få en komplett helhetsbild är vi alltid två som
                            provar casinot och sedan är det vår sammanlagda bild som gäller.
                            Vi verkar så opartiskt vi kan och baserar det mesta på data och
                            fakta, men användarupplevelsen är personlig och speglar hur sajten
                            fungerar från en användares perspektiv. Du kan läsa mer om vår
                            betygsprocess{' '}
                            <Link
                                prefetch={false}
                                href="/hur-vi-recenserar"
                                className="text-blue500"
                            >
                                här
                            </Link>
                            .
                        </ToggleObject>
                    </div>
                </div>
            )}
            <Container className="!max-w-3xl !px-0">
                <Heading level={2} className="mb-5 text-xl font-bold" text={`Snabbfakta om ${title}`} />
                <div className="mb-5 flex gap-3 overflow-x-auto">
                    {quickFacts.map((item) => (
                        <div className="flex flex-shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-gray300 px-6 py-4">
                            <div className="text-xs font-semibold uppercase text-slate600">
                                {item.label}
                            </div>{' '}
                            <span className="block">{item.value}</span>
                        </div>
                    ))}
                </div>
                <ProsAndConsBox pros={casinoPage.casino.advantages} cons={casinoPage.casino.disadvantages} />
                {casinoPage.casino.depositMethods && (
                    <>
                        <h2 className="mb-4 mt-6 text-xl">Betalningsmetoder</h2>
                        <div className={'mb-2 flex flex-wrap items-center'}>
                            {casinoPage.casino.depositMethods.map(
                                (item, i) => (
                                    <>
                                        {
                                            item.logo.src ? (
                                                <Image
                                                    src={item.logo.src}
                                                    alt={item.logo.altText}
                                                    key={`payment-provider-${item._type}`}
                                                    width="54"
                                                    height="30"
                                                    className={'rounded-md border border-gray300'}
                                                />
                                            ) : (
                                                <span
                                                    className={'rounded-md bg-gray200 px-3 py-1 text-sm'}
                                                >
                                                    {item.name}
                                                </span>
                                            )
                                        }
                                    </>
                                ))}
                        </div>
                    </>
                )}
                {casinoPage.casino.withdrawalMethods && (
                    <>
                        <Heading level={2} className="mb-4 mt-6 text-xl" text="Spelleverantörer" />
                        <div className={'mb-2 flex flex-wrap items-center gap-0.5'}>
                            {casinoPage.casino.withdrawalMethods.map(
                                (item, index) => (
                                    <>
                                        {item.logo.src ? (
                                            <Image
                                                key={`game-provider-${index}`}
                                                src={item.logo.src}
                                                alt={item.logo.altText}
                                                width="54"
                                                height="30"
                                                className={'rounded-md border border-gray300'}
                                            />
                                        ) : (
                                            <span
                                                className={
                                                    'text-xs rounded-md block text-slate700 bg-slate100 px-2 py-1.5 border border-slate300'
                                                }
                                            >
                                                {item.name}
                                            </span>
                                        )}
                                    </>
                                )
                            )}
                        </div>
                    </>
                )}{' '}
                {casinoPage.categories?.length > 0 && (
                    <>
                        <h2 className="mb-3 mt-6 text-xl font-bold">Spelkategorier</h2>
                        <div className={'mb-2 flex flex-wrap items-center'}>
                            {casinoPage.categories.map((category) => (
                                <div key={`brand-category-${category._id}`}>
                                    <span
                                        className={
                                            'text-sm rounded-md bg-slate100 border border-slate300 px-3 py-1.5 mr-1 mb-1'
                                        }
                                    >
                                        {category.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {(casinoPage.casino.contactMethods && casinoPage.casino.contactMethods.length > 0) && (
                    <>
                        <h2 className="mb-3 mt-6 text-xl font-bold">Kundtjänst</h2>
                        <ul className="mb-3">
                            {casinoPage.casino.contactMethods.map((contactMethod) => (
                                <li className="flex items-center py-2">
                                    <Mail className="mr-2 h-5 w-5 text-slate600" />
                                    <span className="font-medium">{contactMethod.label}</span>
                                    <div className="ml-auto text-blue600">
                                        {contactMethod.value}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </Container>
        </div>
    )
}

export default CasinoInfo