import { isCurrentPath } from '@/src/lib/helpers'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Container from '@/src/components/atoms/Container'
import Link from '@/src/components/atoms/Link'
import NotificationButton from '@/src/components/molecules/NotificationButton'
import NotificationModal from '@/src/components/molecules/NotificationModal'
import Menu from '@/src/components/organisms/Menu'
import type { Menu as MenuType, MenuItem as MenuItemType } from '@/src/types'
import MenuButton from '@/src/components/molecules/MenuButton'
import SearchButton from '@/src/components/molecules/SearchButton'
import { headers } from 'next/headers'
import MenuModal from '@/src/components/molecules/MenuModal'

export default async function Navigation({
  headerMenu,
  sidebarMenu,
}: {
  headerMenu: MenuType
  sidebarMenu: MenuType
}) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || headersList.get('x-url')
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
              href="/public"
              prefetch={false}
              aria-current={isCurrentPath(pathname, '/') ? 'page' : undefined}
              className={`${
                isCurrentPath(pathname, '/') ? 'text-primary' : 'text-white'
              }`}
            >
              <span className="sr-only">Casinogringos.se</span>
              <Image
                src="https://content.casinogringos.se/wp-content/uploads/2025/03/casinogringos.webp"
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
              {headerMenu.items.map((item: MenuItemType) => (
                <li key={`menu-item-${item.label}`} role="none">
                  <Link
                    href={item.page.slug}
                    role="menuitem"
                    aria-current={
                      isCurrentPath(pathname, item.slug) ? 'page' : undefined
                    }
                    className={`text-nav uppercase tracking-wider font-medium font-inter hover:text-primary transition ${
                      isCurrentPath(pathname, item.slug)
                        ? 'text-primary'
                        : 'text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="ml-auto flex items-center gap-3">
              {sidebarMenu.items.length > 0 && (
                <NotificationButton count={sidebarMenu.items.length} />
              )}
              <SearchButton />
              <MenuButton />
            </div>
          </div>
        </Container>
      </nav>
      {/*<SearchModal>*/}
      {/*  <Search data={searchData} />*/}
      {/*</SearchModal>*/}
      <MenuModal>
        <Menu menu={sidebarMenu} pathname={pathname} />
      </MenuModal>
      {/*<NotificationModal>*/}
      {/*  <section>*/}
      {/*    <div className="relative mt-6 text-lg font-medium">*/}
      {/*      Populära erbjudanden*/}
      {/*    </div>*/}
      {/*    {sidebarPosts.edges.map(({ node }) => (*/}
      {/*      <SidebarPost*/}
      {/*        item={node}*/}
      {/*        key={`review-${node.id}`}*/}
      {/*        pathname={pathname}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*  </section>*/}
      {/*</NotificationModal>*/}
    </>
  )
}
