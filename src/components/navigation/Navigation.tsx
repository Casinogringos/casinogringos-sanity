import CasinoRow from '@/src/components/casino/CasinoRow'
import Container from '@/src/components/layout/Container'
import Menu from '@/src/components/navigation/Menu'
import MenuButton from '@/src/components/navigation/MenuButton'
import MenuModal from '@/src/components/navigation/MenuModal'
import NotificationButton from '@/src/components/navigation/NotificationButton'
import NotificationModal from '@/src/components/navigation/NotificationModal'
import SearchBox from '@/src/components/search/SearchBox'
import SearchButton from '@/src/components/search/SearchButton'
import SearchModal from '@/src/components/search/SearchModal'
import { isCurrentPath } from '@/src/lib/utils'
import { MenuItemSchemaType, MenuSchemaType } from '@/src/schemas/menu'
import { ToplistSchemaType } from '@/src/schemas/toplist'
import Image from 'next/image'
import Link from 'next/link'

export default async function Navigation({
  headerMenu,
  sidebarMenu,
  sidebarToplist,
  pathname,
}: {
  headerMenu: MenuSchemaType
  sidebarMenu: MenuSchemaType
  sidebarToplist: ToplistSchemaType
  pathname: string
}) {
  const parentRoute = pathname?.split('/')[1]

  if (parentRoute === 'go') return null
  return (
    <>
      <nav
        aria-label="Toppnavigation"
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
              className={`${
                isCurrentPath(pathname, '/') ? 'text-primary' : 'text-white'
              }`}
            >
              <span className="sr-only">Casinogringos.se</span>
              <Image
                src="/casinogringos.webp"
                priority={true}
                alt="Casinogringos"
                className="w-20"
                width={80}
                height={40}
                id="logo"
              />
            </Link>
            <ul className="ml-auto hidden space-x-8 lg:-mt-[3px] lg:flex lg:items-center">
              {headerMenu.items?.map((item: MenuItemSchemaType) => (
                <li key={`menu-item-${item._key}`} itemProp="name">
                  <Link
                    href={item.page.slug.current}
                    itemProp="url"
                    aria-current={
                      isCurrentPath(pathname, item.page.slug.current)
                        ? 'page'
                        : undefined
                    }
                    className={`text-nav text-[13px] uppercase tracking-wider font-medium font-inter hover:text-primary transition ${
                      isCurrentPath(pathname, item.page.slug.current)
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
              {sidebarToplist.casinos?.length > 0 ? (
                <NotificationButton count={sidebarToplist.casinos.length} />
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
          {sidebarToplist.casinos?.map((casino) => (
            <CasinoRow casino={casino} key={`casino-${casino._id}`} />
          ))}
        </section>
      </NotificationModal>
    </>
  )
}
