import Heading from '@/src/components/content/Heading'
import Link from '@/src/components/content/Link'
import Container from '@/src/components/layout/Container'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import { ArrowRight, Gift, Star, Vibrate, Zap } from 'lucide-react'
import { PortableText } from 'next-sanity'
import Image from 'next/image'

const HomePageHero = ({ page }: { page: SubPageSchemaType }) => {
  const menuItems = [
    {
      label: 'Nya casinon',
      link: '/nya-casinon',
      icon: <Star size={24} className="text-primary" />,
    },
    {
      label: 'Casino med Swish',
      link: '/casino-med-swish',
      icon: <Vibrate size={26} className="text-primary" />,
    },
    {
      label: 'Casino bonusar',
      link: '/casino-bonus',
      icon: <Gift size={24} className="text-primary" />,
    },
    {
      label: 'Snabba uttag',
      link: '/casino-med-snabba-uttag',
      icon: <Zap size={24} className="text-primary" />,
    },
  ]

  return (
    <div className="relative overflow-hidden bg-darklight">
      <Container>
        <div className="relative z-10 flex flex-col gap-4 pb-4 pt-6 lg:pb-16 lg:pt-12">
          <section className="relative z-10">
            <Heading
              level={1}
              className="max-w-md font-bold tracking-tight text-white !text-3xl sm:!text-[45px] md:!text-[45px] sm:!leading-[52px]"
              text={page.title}
            >
              <span className="block">{page.title}</span>
            </Heading>
            <div className="mt-3 leading-6 text-slate-300 lg:mt-6 lg:max-w-2xl">
              <PortableText value={page.intro} />
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-3 lg:mt-10 lg:grid-cols-4 lg:gap-4">
              {menuItems.map((item) => (
                <li key={`menu-item-${item.label}`}>
                  <Link
                    href={item.link}
                    prefetch={false}
                    className="group relative flex font-bold items-center justify-center gap-4 overflow-hidden rounded-md bg-white p-4 transition md:gap-2.5 lg:h-[58px] lg:p-3.5"
                  >
                    {item.icon}
                    {item.label}
                    <div className="ml-auto rounded-full bg-blue-100 p-1.5 group-hover:bg-dark group-hover:text-white">
                      <ArrowRight className="size-5" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <Image
            src={'/gringo-bg.webp'}
            className="absolute -right-36 bottom-0 hidden size-[435px] opacity-50 lg:-right-12 lg:block lg:opacity-100"
            priority={true}
            width={435}
            quality={50}
            alt="Casinogringos"
            height={435}
          />
        </div>
      </Container>
    </div>
  )
}

export default HomePageHero
