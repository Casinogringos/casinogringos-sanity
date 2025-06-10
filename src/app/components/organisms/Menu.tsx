import { ChevronDown } from 'lucide-react'
import { isCurrentPath } from '@/src/lib/helpers'
import Link from 'next/link'
import type { Menu as MenuType, MenuItem as MenuItemType } from '@/src/types'
import ToggleButton from '@/src/app/components/atoms/ToggleButton'
import ToggleItem from '@/src/app/components/atoms/ToggleItem'

const Menu = ({
  menu,
  pathname,
}: {
  menu: MenuType
  pathname: string | null
}) => {
  return (
    <nav aria-labelledby="sidebarmenu">
      <ul role={'menubar'}>
        {menu.items.map((level1Item: MenuItemType, i: number) => (
          <li
            className={`flex items-center justify-between flex-wrap border-b-gray100 py-4 ${
              menu.items.length - 1 !== i ? 'border-b' : ''
            }`}
            key={`level-1-item-${level1Item._key}`}
            role={'none'}
          >
            <Link
              role={'menuitem'}
              prefetch={false}
              aria-current={
                isCurrentPath(pathname, level1Item.page.slug.current)
                  ? 'page'
                  : undefined
              }
              className={`flex items-center flex-grow overflow-ellipsis overflow-hidden font-medium text-lg whitespace-nowrap text-dark hover:text-primary max-w-[calc(100%-24px)]`}
              href={level1Item.page.slug}
            >
              {level1Item.page.title}
            </Link>
            {level1Item.children?.length ? (
              <>
                <ToggleButton
                  id={`menu-toggle-${i}-${level1Item._key}`}
                  label={'Öppna undermeny'}
                  role={'menuitemcheckbox'}
                >
                  <ChevronDown
                    aria-label={'hidden'}
                    size={24}
                    className={'stroke-dark'}
                  />
                </ToggleButton>
                <ToggleItem
                  id={`menu-toggle-${i}-${level1Item._key}`}
                  className={'w-full'}
                >
                  <ul className={'basis-full pl-3 mt-1'} role={'menu'}>
                    {level1Item.children
                      .filter((child) => {
                        console.log('child', child)
                        return child.page
                      })
                      .map((level2Item: MenuItemType) => (
                        <li
                          key={`level-2-item-${level2Item._key}`}
                          role={'none'}
                        >
                          <Link
                            className={`mt-3 block text-dark lg:hover:text-primary ${
                              isCurrentPath(
                                pathname,
                                level2Item.page.slug.current
                              )
                                ? 'text-primary'
                                : ''
                            }`}
                            prefetch={false}
                            href={level2Item.page.slug.current}
                            role={'menuitem'}
                            aria-current={
                              isCurrentPath(
                                pathname,
                                level2Item.page.slug.current
                              )
                                ? 'page'
                                : undefined
                            }
                          >
                            {level2Item.page.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </ToggleItem>
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Menu
