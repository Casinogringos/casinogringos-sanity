import Link from '@/src/components/content/Link'
import ToggleButton from '@/src/components/interactivity/ToggleButton'
import ToggleItem from '@/src/components/interactivity/ToggleItem'
import ToggleSpin from '@/src/components/interactivity/ToggleSpin'
import { isCurrentPath } from '@/src/lib/utils'
import {
  MenuItemChildSchemaType,
  MenuItemSchemaType,
  MenuSchemaType,
} from '@/src/schemas/menu'
import { ChevronDown } from 'lucide-react'

const Menu = ({
  menu,
  pathname,
}: {
  menu: MenuSchemaType
  pathname: string
}) => {
  return (
    <nav aria-label="Sidomeny">
      <ul>
        {menu?.items?.map((level1Item: MenuItemSchemaType, i: number) => (
          <li
            className={`border-b-gray-100 py-4 flex flex-wrap items-center overflow-hidden ${
              menu.items.length - 1 !== i ? 'border-b' : ''
            }`}
            key={`level-1-item-${level1Item._key}`}
          >
            <Link
              variant={'ghost'}
              prefetch={false}
              aria-current={
                isCurrentPath(pathname, level1Item.page.slug.current)
                  ? 'page'
                  : undefined
              }
              className={`truncate ellipsis float-left flex-grow font-medium text-lg whitespace-nowrap hover:text-primary max-w-[calc(100%-34px)]`}
              href={level1Item.page.slug.current}
              actions={['close-menu']}
            >
              {level1Item.page.title}
            </Link>
            {level1Item.children?.length ? (
              <>
                <ToggleButton
                  id={`menu-toggle-${i}-${level1Item._key}`}
                  label={'Öppna undermeny'}
                  controlsId={`submenu-${i}-${level1Item._key}`}
                  className="w-[34px] h-[34px] inline-flex items-center justify-center float-right"
                >
                  <ToggleSpin id={`menu-toggle-${i}-${level1Item._key}`}>
                    <ChevronDown
                      aria-hidden="true"
                      focusable="false"
                      size={24}
                      className={'stroke-dark'}
                    />
                  </ToggleSpin>
                </ToggleButton>
                <ToggleItem
                  id={`menu-toggle-${i}-${level1Item._key}`}
                  className={'w-full'}
                >
                  <ul
                    id={`submenu-${i}-${level1Item._key}`}
                    className={'basis-full pl-3 mt-1'}
                  >
                    {level1Item.children
                      .filter((child) => {
                        return child.page
                      })
                      .map((level2Item: MenuItemChildSchemaType) => (
                        <li key={`level-2-item-${level2Item._key}`}>
                          <Link
                            variant={'ghost'}
                            className={`mt-3 block text-dark lg:hover:text-primary`}
                            prefetch={false}
                            href={level2Item.page.slug.current}
                            actions={['close-menu']}
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
