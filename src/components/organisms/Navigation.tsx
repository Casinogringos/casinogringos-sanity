import { isCurrentPath } from "../../../../casinogringos-v3/src/lib/helpers";
import dynamic from "next/dynamic";
import Image from "next/image";
import Container from "../../../../casinogringos-v3/src/components/Container";
import InternalLink from "../../../../casinogringos-v3/src/components/InternalLink";
import NotificationButton from "@/app/components/navigation/NotificationButton";
import NotificationModal from "@/app/components/navigation/NotificationModal";
import Menu from "@/app/components/navigation/Menu";
import SidebarPost from "../../../../casinogringos-v3/src/components/SidebarPost";
import MenuButton from "@/app/components/navigation/MenuButton";
import SearchButton from "@/app/components/navigation/SearchButton";
import SearchModal from "@/app/components/navigation/SearchModal";
import { headers } from "next/headers";
import MenuModal from "@/app/components/navigation/MenuModal";
const Search = dynamic(
  () => import("../../../../casinogringos-v3/src/components/Search"),
);

export default async function Navigation({
  topNav,
  sidebarNav,
  sidebarPosts,
  searchData,
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || headersList.get("x-url");
  const parentRoute = pathname?.split("/")[1];
  if (parentRoute === "go") return null;

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
            <InternalLink
              href="/public"
              prefetch={false}
              aria-current={isCurrentPath(pathname, "/") ? "page" : undefined}
              className={`${
                isCurrentPath(pathname, "/") ? "text-primary" : "text-white"
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
            </InternalLink>
            <ul
              role="menubar"
              className="ml-auto hidden space-x-8 lg:-mt-[3px] lg:flex lg:items-center"
            >
              {topNav.menuItems.edges.map(({ node }) => (
                <li key={`menu-item-${node.label}`} role="none">
                  <InternalLink
                    href={node.uri}
                    role="menuitem"
                    aria-current={
                      isCurrentPath(pathname, node.uri) ? "page" : undefined
                    }
                    className={`text-nav uppercase tracking-wider font-medium font-inter hover:text-primary transition ${
                      isCurrentPath(pathname, node.uri)
                        ? "text-primary"
                        : "text-white"
                    }`}
                  >
                    {node.label}
                  </InternalLink>
                </li>
              ))}
            </ul>
            <div className="ml-auto flex items-center gap-3">
              {sidebarPosts.edges.length > 0 && (
                <NotificationButton count={sidebarPosts.edges.length} />
              )}
              <SearchButton />
              <MenuButton />
            </div>
          </div>
        </Container>
      </nav>
      <SearchModal>
        <Search data={searchData} />
      </SearchModal>
      <MenuModal>
        <Menu menu={sidebarNav} pathname={pathname} />
      </MenuModal>
      <NotificationModal>
        <section>
          <div className="relative mt-6 text-lg font-medium">
            Populära erbjudanden
          </div>
          {sidebarPosts.edges.map(({ node }) => (
            <SidebarPost
              item={node}
              key={`review-${node.id}`}
              pathname={pathname}
            />
          ))}
        </section>
      </NotificationModal>
    </>
  );
}
