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
            className={`flex flex-wrap items-center overflow-hidden ${
              menu.items.length - 1 !== i ? 'mb-4' : ''
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
              className={`truncate ellipsis float-left flex-grow text-[16px] whitespace-nowrap transition-colors duration-150 max-w-[calc(100%-40px)] py-2 ${
                isCurrentPath(pathname, level1Item.page.slug.current)
                  ? 'text-dark font-semibold'
                  : 'text-slate-800 font-medium hover:text-dark'
              }`}
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
                  className="w-8 h-8 inline-flex items-center justify-center float-right transition-colors duration-150"
                >
                  <ToggleSpin id={`menu-toggle-${i}-${level1Item._key}`}>
                    <ChevronDown
                      aria-hidden="true"
                      focusable="false"
                      size={18}
                      strokeWidth={1.5}
                      className={'stroke-gray-400'}
                    />
                  </ToggleSpin>
                </ToggleButton>
                <ToggleItem
                  id={`menu-toggle-${i}-${level1Item._key}`}
                  className={'w-full'}
                >
                  <ul
                    id={`submenu-${i}-${level1Item._key}`}
                    className={
                      'basis-full mt-2 px-4 py-1 space-y-0.5 border-l border-slate-200/60 bg-gradient-to-r from-slate-50/30 to-transparent rounded-r-md'
                    }
                  >
                    {level1Item.children
                      .filter((child) => {
                        return child.page
                      })
                      .map((level2Item: MenuItemChildSchemaType) => (
                        <li key={`level-2-item-${level2Item._key}`}>
                          <Link
                            variant={'ghost'}
                            className={`block py-2 px-2 -mx-2 text-[14px] rounded-md transition-all duration-200 ${
                              isCurrentPath(
                                pathname,
                                level2Item.page.slug.current
                              )
                                ? 'text-dark font-medium bg-white/80 shadow-sm'
                                : 'text-gray-500 font-normal hover:text-dark hover:bg-white/60'
                            }`}
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
