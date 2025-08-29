import Image from 'next/image'
import Link from '@/src/components/atoms/Link'
import Container from '@/src/components/atoms/Container'
import Heading from '@/src/components/atoms/Heading'
import ProsAndConsBox from '@/src/components/organisms/ProsAndConsBox'
import StarIcon from '@/src/components/icons/StarIcon'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
import CasinoService from '@/src/services/CasinoService'
import { PortableText } from 'next-sanity'
import ToggleObject from '@/src/components/molecules/ToggleObject'
import { PaymentMethodPageSchemaType } from '@/src/schemas/paymentMethodPage'

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
    console.log('casinoPage.casino.availableDepositMethods', casinoPage.casino.availableDepositMethods)
    console.log('casinoPage.casino.availableWithdrawalMethods', casinoPage.casino.availableWithdrawalMethods)
    const depositMethodsPages = casinoPage.casino.availableDepositMethods.reduce((acc, item) => {
        acc.push(item.depositMethodPages[0])
        return acc
    }, [] as PaymentMethodPageSchemaType[])
    const withdrawalMethodsPages = casinoPage.casino.availableWithdrawalMethods.reduce((acc, item) => {
        acc.push(item.withdrawalMethodPages[0])
        return acc
    }, [] as PaymentMethodPageSchemaType[])
    const paymentMethodPages: PaymentMethodPageSchemaType[] = [...depositMethodsPages, ...withdrawalMethodsPages].reduce((acc, page) => {
        if (page && !acc.some((method) => method.paymentMethod.slug.current === page.paymentMethod.slug.current)) {
            acc.push(page)
        }
        return acc
    }, [] as PaymentMethodPageSchemaType[])

    return (
        <div>
            <div className="mb-8 w-full rounded-2xl">
                <div className="relative mb-8 gap-6 overflow-hidden rounded-t-md bg-darklight p-5 md:overflow-visible md:rounded-md">
                    <Heading
                        className={'!-mt-1 text-lg text-white'}
                        level={2}
                        text="Vårt betyg"
                    />
                    <div className="mt-2 flex items-start text-white">
                        <strong className="text-5xl">{finalRating}</strong>
                        <div className="ml-1 mt-0.5 flex gap-1 text-sm font-medium text-slate-400">
                            /5 <StarIcon className="size-5 text-yellow-400" />
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
                        <div className="mr-28 pt-3 text-sm text-slate-200 md:mr-36">
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
                                            <p className="mb-0 ml-auto font-normal text-slate-500">
                                                <strong className="text-lg text-black">
                                                    {ratings[key]}
                                                </strong>
                                                /5
                                            </p>
                                        </span>
                                        <div className="flex h-2 overflow-hidden rounded-md bg-slate-300 text-xs">
                                            <div
                                                style={{ width: rating * 20 + '%' }}
                                                className="flex flex-col justify-center whitespace-nowrap bg-green-500 text-center text-white shadow-none"
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
            <Heading level={2} size={5} className="mb-3 font-bold" text={`Snabbfakta om ${title}`} />
            <div className="mb-5 flex gap-3 overflow-x-auto">
                {quickFacts.map((item) => (
                    <div key={`quick-fact-${item.label}`} className="flex flex-shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-gray-300 px-6 py-4">
                        <div className="text-xs font-semibold uppercase text-slate-600">
                            {item.label}
                        </div>{' '}
                        {item.value ? <span className="block">{item.value}</span> : null}
                    </div>
                ))}
            </div>
            <ProsAndConsBox casinoPage={casinoPage} prosTitle="Vad du får" consTitle="Vad du inte får" />
            {paymentMethodPages && paymentMethodPages.length > 0 && (
                <div>
                    <Heading size={5} level={2} className="mb-3 mt-5 font-bold" text='Betalningsmetoder' />
                    <div className={'mb-5 flex flex-wrap items-center'}>
                        {paymentMethodPages.map(
                            ({ paymentMethod, linkedPage }, i) => {
                                const Tag = linkedPage ? Link : 'div'
                                return <Tag href={linkedPage?.slug.current} className='h-[40px] w-[54px] relative' key={`payment-provider-${paymentMethod._id}`}>
                                    {
                                        paymentMethod.logo.src ? (
                                            <Image
                                                src={paymentMethod.logo.src}
                                                alt={paymentMethod.logo.altText}
                                                key={`payment-provider-${paymentMethod._type}`}
                                                width="54"
                                                height="30"
                                                className={'rounded-md border border-gray-300 h-full w-full absolute object-cover'}
                                            />
                                        ) : (
                                            <span
                                                className={'rounded-md bg-gray-200 px-3 py-1 text-sm'}
                                            >
                                                {paymentMethod.name}
                                            </span>
                                        )
                                    }
                                </Tag>
                            }
                        )}
                    </div>
                </div>
            )}
            {casinoPage.casino.gameProviders && (
                <>
                    <Heading level={2} size={5} className="mb-3 mt-5 font-bold" text="Spelleverantörer" />
                    <div className={'mb-2 flex flex-wrap items-center gap-0.5'}>
                        {casinoPage.casino.gameProviders.map(
                            (item) => (
                                <div key={`game-provider-${item._id}`} className='h-[40px] w-[54px] relative'>
                                    {item.featuredImage.src ? (
                                        <Image
                                            src={item.featuredImage.src}
                                            alt={item.featuredImage.altText}
                                            width="54"
                                            height="40"
                                            className={'rounded-md border border-gray-300 h-full w-full absolute object-cover'}
                                        />
                                    ) : (
                                        <span
                                            className={
                                                'text-xs rounded-md block text-slate-700 bg-slate-100 px-2 py-1.5 border border-slate-300'
                                            }
                                        >
                                            {item.name}
                                        </span>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </>
            )}{' '}
            {casinoPage.categories && casinoPage.categories.length > 0 && (
                <>
                    <h2 className="mb-3 mt-6 text-xl font-bold">Spelkategorier</h2>
                    <div className={'mb-2 flex flex-wrap items-center'}>
                        {casinoPage.categories.map((category) => (
                            <div key={`brand-category-${category._id}`}>
                                <span
                                    className={
                                        'text-sm rounded-md bg-slate-100 border border-slate-300 px-3 py-1.5 mr-1 mb-1'
                                    }
                                >
                                    {category.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}
            {(casinoPage.casino.contactMethods && casinoPage.casino.contactMethods.length > 0) ? (
                <>
                    <Heading level={2} className="mb-3 mt-6 text-xl font-bold" text="Kundtjänst" />
                    <ul className="mb-3">
                        {casinoPage.casino.contactMethods.map((contactMethod) => (
                            <li key={`contact-method-${contactMethod.label}`} className="flex items-center py-2 border-b border-gray-200">
                                <span className="font-medium">{contactMethod.label}</span>
                                <div className="ml-auto text-blue-600">
                                    {contactMethod.value}
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : null}
        </div>
    )
}

export default CasinoInfo