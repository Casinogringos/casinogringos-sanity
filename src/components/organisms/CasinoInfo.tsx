import { Mail, MessageCircle, Phone } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/src/components/atoms/Container'
import Heading from '@/src/components/atoms/Heading'
import ProsAndConsBox from '@/src/components/organisms/ProsAndConsBox'
import StarIcon from '@/src/components/icons/StarIcon'
import { CasinoPageSchemaType } from '@/src/schemas'
import CasinoService from '@/src/services/CasinoService'
import { PortableText } from 'next-sanity'

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
                        <ToggleBlock
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
                        </ToggleBlock>
                    </div>
                </div>
            )}
            <Container className="!max-w-3xl !px-0">
                <h2 className="mb-5 text-xl font-bold">Snabbfakta om {title}</h2>
                <div className="mb-5 flex gap-3 overflow-x-auto">
                    <div className="flex flex-shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-gray300 px-6 py-4">
                        <div className="text-xs font-semibold uppercase text-slate600">
                            Svensk licens
                        </div>{' '}
                        <span className="block">Ja</span>
                    </div>
                    <div className="flex flex-shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-gray300 px-6 py-4">
                        <div className="text-xs font-semibold uppercase text-slate600">
                            BankID
                        </div>{' '}
                        <span className="block">Ja</span>
                    </div>
                    <div className="flex flex-shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-gray300 px-6 py-4">
                        <div className="text-xs font-semibold uppercase text-slate600">
                            Swish
                        </div>{' '}
                        <span className="block">{casino.postType.swish}</span>
                    </div>
                    <div className="flex flex-shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-gray300 px-6 py-4">
                        <div className="text-xs font-semibold uppercase text-slate600">
                            Livechatt
                        </div>{' '}
                        <span className="block">{casino.postType.liveChat}</span>
                    </div>
                    <div className="flex flex-shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-gray300 px-6 py-4">
                        <div className="text-xs font-semibold uppercase text-slate600">
                            Lanserades
                        </div>{' '}
                        <span className="block">{casino.postType.lanseradesDatum}</span>
                    </div>
                    <div className="flex flex-shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-gray300 px-6 py-4">
                        <div className="text-xs font-semibold uppercase text-slate600">
                            Minsta insättning
                        </div>{' '}
                        <span className="block">{casino.postType.minInsattningValue}</span>
                    </div>
                </div>
                <ProsAndCons block={prosAndCons} />
                {casino.postType.paymentprovidersNew && (
                    <>
                        <h2 className="mb-4 mt-6 text-xl">Betalningsmetoder</h2>
                        <div className={'mb-2 flex flex-wrap items-center'}>
                            {casino.postType.paymentprovidersNew.edges.map(
                                ({ node: paymentProvider }, i) => {
                                    let Tag
                                    let props = {}
                                    if (
                                        paymentProvider.paymentMethodType?.siteLink?.edges?.length
                                    ) {
                                        Tag = Link
                                        props = {
                                            href: paymentProvider.paymentMethodType.siteLink.edges[0]
                                                .node.uri,
                                        }
                                    } else {
                                        Tag = 'div'
                                    }
                                    return (
                                        <Tag
                                            className={'mb-1 mr-1'}
                                            {...props}
                                            key={`payment-provider-${i}`}
                                        >
                                            {paymentProvider.featuredImage?.node.sourceUrl ? (
                                                <Image
                                                    src={paymentProvider.featuredImage.node.sourceUrl}
                                                    alt={paymentProvider.featuredImage.node.altText}
                                                    key={`payment-provider-${i}`}
                                                    width="54"
                                                    height="30"
                                                    className={'rounded-md border border-gray300'}
                                                />
                                            ) : (
                                                <span
                                                    className={'rounded-md bg-gray200 px-3 py-1 text-sm'}
                                                >
                                                    {paymentProvider.title}
                                                </span>
                                            )}
                                        </Tag>
                                    )
                                }
                            )}
                        </div>
                    </>
                )}
                {casino.postType?.gameprovidersNew && (
                    <>
                        <h2 className="mb-4 mt-6 text-xl">Spelleverantörer</h2>
                        <div className={'mb-2 flex flex-wrap items-center gap-0.5'}>
                            {casino.postType.gameprovidersNew.edges.map(
                                ({ node: gameProvider }, index) => {
                                    let Tag
                                    let props = {}
                                    if (gameProvider.gameProviderType?.siteLink?.nodes?.length) {
                                        Tag = Link
                                        props = {
                                            href: gameProvider.gameProviderType.siteLink.nodes[0].uri,
                                        }
                                    } else {
                                        Tag = 'div'
                                    }
                                    return (
                                        <Tag
                                            className={'mb-1 mr-1'}
                                            {...props}
                                            key={`game-provider-${index}`}
                                        >
                                            {gameProvider.featuredImage?.node.sourceUrl ? (
                                                <Image
                                                    key={`game-provider-${index}`}
                                                    src={gameProvider.featuredImage.node.sourceUrl}
                                                    alt={gameProvider.featuredImage.node.altText}
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
                                                    {gameProvider.title}
                                                </span>
                                            )}
                                        </Tag>
                                    )
                                }
                            )}
                        </div>
                    </>
                )}{' '}
                {casino.postType?.brandCategories?.length > 0 && (
                    <>
                        <h2 className="mb-3 mt-6 text-xl font-bold">Spelkategorier</h2>
                        <div className={'mb-2 flex flex-wrap items-center'}>
                            {casino.postType.brandCategories.map((brandCategory, i) => (
                                <div key={`brand-category-${i}`}>
                                    <span
                                        className={
                                            'text-sm rounded-md bg-slate100 border border-slate300 px-3 py-1.5 mr-1 mb-1'
                                        }
                                    >
                                        {brandCategory}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {(casino.postType.brandEmail ||
                    casino.postType.kundtjanstTelefon ||
                    casino.postType.brandSupportHours) && (
                        <>
                            <h2 className="mb-3 mt-6 text-xl font-bold">Kundtjänst</h2>
                            <ul className="mb-3">
                                {casino.postType.brandEmail && (
                                    <li className="flex items-center py-2">
                                        <Mail className="mr-2 h-5 w-5 text-slate600" />
                                        <span className="font-medium">E-post</span>
                                        <Link
                                            href={`mailto:${casino.postType.brandEmail}`}
                                            className="ml-auto text-blue600"
                                        >
                                            {casino.postType.brandEmail}
                                        </Link>
                                    </li>
                                )}
                                {casino.postType.kundtjanstTelefon && (
                                    <li className="flex items-center border-t border-t-slate200 py-2">
                                        <Phone className="mr-2 h-5 w-5 text-slate600" />
                                        <span className="font-medium">Telefon</span>
                                        <span className="ml-auto text-gray500">
                                            {casino.postType.kundtjanstTelefon}
                                        </span>
                                    </li>
                                )}
                                {casino.postType.brandSupportHours && (
                                    <li className="flex items-center border-t border-t-slate200 py-2">
                                        <MessageCircle className="mr-2 h-5 w-5 text-slate600" />
                                        <span className="font-medium">Live chatt öppettider</span>
                                        <span className="ml-auto text-gray500">
                                            {casino.postType.brandSupportHours}
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </>
                    )}
            </Container>
            {/* <TabComponent props={casino} /> */}
        </div>
    )
}

export default CasinoInfo