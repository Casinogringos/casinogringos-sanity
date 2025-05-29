import InternalLink from './InternalLink'
export default function Drop({ item, toggle, dropdown, id, index }) {
  const menuItems = item?.childItems?.nodes ? item?.childItems?.nodes : []

  const transClass = dropdown && index === id ? 'flex' : 'hidden'

  return (
    <>
      <div className="relative">
        <ul
          id={id}
          className={`flex flex-col py-4 bg-zinc400 rounded-md ${transClass}`}
        >
          {menuItems?.map((item) => (
            <InternalLink
              prefetch={false}
              key={`menu-item-${item.uri}`}
              className="hover:text-zinc-500 px-4 py-1 hover:bg-zinc300"
              href={item?.uri || ''}
              onClick={toggle}
            >
              {item.label}
            </InternalLink>
          ))}
        </ul>
      </div>
    </>
  )
}
