import { isCurrentPath } from '@/src/lib/helpers'
import Image from 'next/image'
import Container from '@/src/components/atoms/Container'
import Link from 'next/link'
import NotificationButton from '@/src/components/molecules/NotificationButton'
import Menu from '@/src/components/organisms/Menu'
import MenuButton from '@/src/components/molecules/MenuButton'
import SearchButton from '@/src/components/molecules/SearchButton'
import { headers } from 'next/headers'
import MenuModal from '@/src/components/molecules/MenuModal'
import NotificationModal from '@/src/components/molecules/NotificationModal'
import CasinoRow from '@/src/components/organisms/CasinoTableRow'
import { MenuItemSchemaType, MenuSchemaType } from '@/src/schemas/menu'
import { ToplistSchemaType } from '@/src/schemas/toplist'
import SearchModal from '@/src/components/molecules/SearchModal'
import SearchBox from '@/src/components/molecules/SearchBox'

export default async function Navigation({
  headerMenu,
  sidebarMenu,
  sidebarToplist,
  pathname,
}: {
  headerMenu: MenuSchemaType
  sidebarMenu: MenuSchemaType
  sidebarToplist: ToplistSchemaType
  pathname: string | null
}) {
  // const headersList = await headers()
  // const pathname =
  //   headersList.get('x-pathname') || headersList.get('x-url') || ''
  // console.log('pathname', pathname)
  const parentRoute = pathname?.split('/')[1]

  if (parentRoute === 'go') return null
  return (
    <>
      <nav
        aria-labelledby="Header menu"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
        className="sticky top-0 z-[100] flex h-14 w-full items-center bg-dark lg:h-16"
      >
        <Container>
          <div className="flex items-center gap-x-12 lg:px-0">
            <Link
              href="/"
              prefetch={false}
              aria-current={isCurrentPath(pathname, '/') ? 'page' : undefined}
              className={`${isCurrentPath(pathname, '/') ? 'text-primary' : 'text-white'
                }`}
            >
              <span className="sr-only">Casinogringos.se</span>
              <Image
                src="/casinogringos.webp"
                priority={true}
                alt="Casinogringos"
                className="w-18"
                width={80}
                height={40}
              />
            </Link>
            <ul
              role="menubar"
              className="ml-auto hidden space-x-8 lg:-mt-[3px] lg:flex lg:items-center"
            >
              {headerMenu.items?.map((item: MenuItemSchemaType) => (
                <li key={`menu-item-${item._key}`} role="none">
                  <Link
                    href={item.page.slug.current}
                    role="menuitem"
                    aria-current={
                      isCurrentPath(pathname, item.page.slug.current)
                        ? 'page'
                        : undefined
                    }
                    className={`text-nav text-sm uppercase tracking-wider font-medium font-inter hover:text-primary transition ${isCurrentPath(pathname, item.page.slug.current)
                      ? 'text-primary'
                      : 'text-white'
                      }`}
                  >
                    {item.label ?? item.page.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="ml-auto flex items-center gap-3">
              {sidebarMenu.items?.length > 0 ? (
                <NotificationButton count={sidebarMenu.items.length} />
              ) : null}
              <SearchButton />
              <MenuButton />
            </div>
          </div>
        </Container>
      </nav>
      <SearchModal>
        <SearchBox />
      </SearchModal>
      <MenuModal>
        <Menu menu={sidebarMenu} pathname={pathname} />
      </MenuModal>
      <NotificationModal>
        <section>
          <div className="relative mt-6 text-lg font-medium">
            Populära erbjudanden
          </div>
          {sidebarToplist.casinos.map((casino, index) => (
            <CasinoRow
              casinoPage={casino}
              key={`casino-${casino._id}`}
              index={index}
            />
          ))}
        </section>
      </NotificationModal>
    </>
  )
}
