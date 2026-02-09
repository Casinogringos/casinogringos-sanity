import Container from '@/src/components/layout/Container'
import { LazySearchModal } from '@/src/components/navigation/LazyModals'
import Menu from '@/src/components/navigation/Menu'
import MenuButton from '@/src/components/navigation/MenuButton'
import MenuModal from '@/src/components/navigation/MenuModal'
import SearchButton from '@/src/components/search/SearchButton'
import { isCurrentPath } from '@/src/lib/utils'
import { MenuItemSchemaType, MenuSchemaType } from '@/src/schemas/menu'
import Image from 'next/image'
import Link from 'next/link'

export default async function Navigation({
  headerMenu,
  sidebarMenu,
  pathname,
}: {
  headerMenu: MenuSchemaType
  sidebarMenu: MenuSchemaType
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
              <SearchButton />
              <MenuButton />
            </div>
          </div>
        </Container>
      </nav>
      <LazySearchModal />
      <MenuModal>
        <Menu menu={sidebarMenu} pathname={pathname} />
      </MenuModal>
    </>
  )
}
