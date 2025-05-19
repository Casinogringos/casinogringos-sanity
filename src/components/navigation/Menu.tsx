import { ChevronDown } from "lucide-react";
import { isCurrentPath } from "../../../../casinogringos-v3/src/lib/helpers";
import InternalLink from "../../../../casinogringos-v3/src/components/InternalLink";
import type { Menu } from "../../../../casinogringos-v3/src/types";
import ToggleButton from "@/app/components/ui/ToggleButton";
import ToggleItem from "@/app/components/ui/ToggleItem";

const Menu = ({ menu, pathname }: { menu: Menu; pathname: string | null }) => {
  return (
    <nav aria-labelledby="sidebarmenu">
      <ul role={"menubar"}>
        {menu.menuItems.edges.map(({ node: level1Item }, i) => (
          <li
            className={`flex items-center justify-between flex-wrap border-b-gray100 py-4 ${
              menu.menuItems.edges.length - 1 !== i ? "border-b" : ""
            }`}
            key={`level-1-item-${level1Item.id}`}
            role={"none"}
          >
            <InternalLink
              role={"menuitem"}
              prefetch={false}
              aria-current={
                isCurrentPath(pathname, level1Item.uri) ? "page" : undefined
              }
              className={`flex items-center flex-grow overflow-ellipsis overflow-hidden font-medium text-lg whitespace-nowrap text-dark/90 hover:text-primary max-w-[calc(100%-24px)]`}
              href={level1Item.connectedNode.node.indexSlug ?? level1Item.uri}
            >
              {level1Item.label}
            </InternalLink>
            {level1Item.childItems?.edges.length ? (
              <>
                <ToggleButton
                  id={`menu-toggle-${i}-${level1Item.id}`}
                  label={"Öppna undermeny"}
                  role={"menuitemcheckbox"}
                >
                  <ChevronDown
                    aria-label={"hidden"}
                    size={24}
                    className={"stroke-dark/80"}
                  />
                </ToggleButton>
                <ToggleItem
                  id={`menu-toggle-${i}-${level1Item.id}`}
                  className={"w-full"}
                >
                  <ul className={"basis-full pl-3 mt-1"} role={"menu"}>
                    {level1Item.childItems.edges.map(({ node: level2Item }) => (
                      <li key={`level-2-item-${level2Item.id}`} role={"none"}>
                        <InternalLink
                          className={`mt-3 block text-black lg:hover:text-primary ${
                            isCurrentPath(pathname, level2Item.uri)
                              ? "text-primary"
                              : ""
                          }`}
                          prefetch={false}
                          href={
                            level2Item.connectedNode.node.indexSlug ??
                            level2Item.uri
                          }
                          role={"menuitem"}
                          aria-current={
                            isCurrentPath(pathname, level2Item.uri)
                              ? "page"
                              : undefined
                          }
                        >
                          {level2Item.label}
                        </InternalLink>
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
  );
};

export default Menu;
