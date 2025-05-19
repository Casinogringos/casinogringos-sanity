import { removeFirstSlash } from "./helpers";
import { DocumentNode, print } from "graphql";
import {
  AffiliateLink,
  Guide,
  Menu,
  NodeWithPreview,
  News,
  Page,
  Post,
  Slot,
  User,
} from "@/types/index";
import {
  allAuthorPreviewsQuery,
  allGuidePreviewsQuery,
  allNewsQuery,
  allSlotPreviewsQuery,
  authorBySlugQuery,
  guidePreviewsQuery,
  menuByIdQuery,
  newsPreviewsQuery,
  nodeByUriQuery,
  postPreviewsQuery,
  postPreviewsSidebarQuery,
  sitemapAuthorsQuery,
  sitemapGuidesQuery,
  sitemapNewsQuery,
  sitemapPagesQuery,
  sitemapPostsQuery,
  sitemapSlotsQuery,
  slotPreviewsQuery,
} from "../../../casinogringos-v3/src/data/queries";
import { gql } from "graphql-tag";
import { searchQuery } from "../../../casinogringos-v3/src/data/queries/search";

export async function fetchAPI({
  query,
  variables,
}: {
  query: DocumentNode;
  variables?: Record<string, string | number | boolean>;
}) {
  try {
    const response = await fetch(process.env.WORDPRESS_API_URL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: print(query),
        variables,
      }),
    });
    const json = await response.json();
    return json.data;
  } catch (e) {
    console.log(e);
  }
}

export async function getNodeByUri({
  uri,
  token,
}: {
  uri: string;
  token?: string;
}) {
  try {
    const data = await fetchAPI({
      query: nodeByUriQuery(),
      variables: {
        uri: uri,
      },
    });

    return token
      ? ({
          ...data.nodeByUri,
          preview: data?.nodeByUri.preview?.node,
        } as NodeWithPreview<
          Page | Post | Guide | News | Slot | User | AffiliateLink
        >)
      : (data?.nodeByUri as
          | Page
          | Post
          | Guide
          | News
          | Slot
          | User
          | AffiliateLink);
  } catch (e) {
    console.log(e);
    throw Error(`Failed to fetch node by uri: ${uri}`);
  }
}

export async function getPostPreviews({
  count = 1000,
  category,
}: {
  count: number;
  category?: string;
}) {
  try {
    let variables: Record<string, string | number> = {
      first: count,
    };
    if (category) {
      variables = {
        ...variables,
        category,
      };
    }
    const data = await fetchAPI({
      query: postPreviewsQuery({}),
      variables,
    });
    return data?.posts as { edges: { node: Post }[] };
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch posts");
  }
}

export async function getPostPreviewsSidebar({
  count = 1000,
}: {
  count: number;
}) {
  try {
    const data = await fetchAPI({
      query: postPreviewsSidebarQuery(),
      variables: {
        first: count,
      },
    });
    return data?.posts as { edges: { node: Post }[] };
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch posts");
  }
}

export async function getNewsPreviews({ count }: { count: number }) {
  try {
    const data = await fetchAPI({
      query: newsPreviewsQuery(),
      variables: {
        count,
      },
    });
    return data?.nyheter as { edges: { node: News }[] };
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch news previews");
  }
}

export async function getGuidePreviews({ count }: { count: number }) {
  try {
    const data = await fetchAPI({
      query: guidePreviewsQuery(),
      variables: {
        count,
      },
    });
    return data?.guider as { edges: { node: Guide }[] };
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch guide previews");
  }
}

export async function getAllAuthorPreviews() {
  try {
    const data = await fetchAPI({
      query: allAuthorPreviewsQuery(),
    });
    return data?.users.edges.filter(
      ({ node }: { node: { slug: string } }) => node.slug !== "jamie",
    ) as {
      node: User;
    }[];
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch all author previews");
  }
}

export async function getAuthorBySlug({ slug }: { slug: string }) {
  try {
    const data = await fetchAPI({
      query: authorBySlugQuery(),
      variables: { slug },
    });
    return data?.user as User;
  } catch (e) {
    console.log(e);
    throw Error(`Failed to fetch author by slug: ${slug}`);
  }
}

export async function getAllGuidePreviews({
  count = 1000,
}: {
  count?: number;
}) {
  try {
    const data = await fetchAPI({
      query: allGuidePreviewsQuery(),
      variables: {
        first: count,
      },
    });
    return data?.guider as { edges: { node: Guide }[] };
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch all guide previews");
  }
}

export async function getAllSlotPreviews({ count = 1000 }: { count?: number }) {
  try {
    const data = await fetchAPI({
      query: allSlotPreviewsQuery(),
      variables: {
        first: count,
      },
    });
    return data?.slots as { edges: { node: Slot }[] };
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch all slot previews");
  }
}

export async function getSlotPreviews({ count }: { count: number }) {
  try {
    const data = await fetchAPI({
      query: slotPreviewsQuery(),
      variables: {
        first: count,
      },
    });
    return data?.slots as { edges: { node: Slot }[] };
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch all slot previews");
  }
}

export async function getStaticParams(
  type: "news" | "page" | "slot" | "post" | "guide" | "affiliate" | "author",
) {
  switch (type) {
    case "news":
      try {
        const newsResponse = await fetchAPI({
          query: gql`
            query newsParams {
              nyheter(first: 1000) {
                edges {
                  node {
                    slug
                  }
                }
              }
            }
          `,
        });
        return newsResponse.nyheter.edges;
      } catch (e) {
        console.log(e);
        throw Error("Failed to fetch news params");
      }
    case "page":
      try {
        const pagesResponse = await fetchAPI({
          query: gql`
            query {
              pages(first: 1000) {
                edges {
                  node {
                    uri
                  }
                }
              }
            }
          `,
        });
        return pagesResponse.pages.edges;
      } catch (e) {
        console.log(e);
        throw Error("Failed to fetch pages params");
      }
    case "slot":
      try {
        const slotsResponse = await fetchAPI({
          query: gql`
            query {
              slots(first: 1000) {
                edges {
                  node {
                    slug
                  }
                }
              }
            }
          `,
        });
        return slotsResponse.slots.edges;
      } catch (e) {
        console.log(e);
        throw Error("Failed to fetch slots params");
      }
    case "post":
      try {
        const postsResponse = await fetchAPI({
          query: gql`
            query {
              posts(first: 1000) {
                edges {
                  node {
                    uri
                  }
                }
              }
            }
          `,
        });
        return postsResponse.posts.edges;
      } catch (e) {
        console.log(e);
        throw Error("Failed to fetch posts params");
      }
    case "guide":
      try {
        const guidesResponse = await fetchAPI({
          query: gql`
            query {
              guider(first: 1000) {
                edges {
                  node {
                    slug
                  }
                }
              }
            }
          `,
        });
        return guidesResponse.guider.edges;
      } catch (e) {
        console.log(e);
        throw Error("Failed to fetch guides params");
      }
    case "affiliate":
      try {
        const affiliatesResponse = await fetchAPI({
          query: gql`
            query {
              affiliateLinks(first: 1000) {
                edges {
                  node {
                    slug
                  }
                }
              }
            }
          `,
        });
        return affiliatesResponse.affiliateLinks.edges;
      } catch (e) {
        console.log(e);
        throw Error("Failed to fetch affiliates params");
      }
    case "author":
      try {
        const authorsResponse = await fetchAPI({
          query: gql`
            query {
              users(first: 1000) {
                edges {
                  node {
                    slug
                  }
                }
              }
            }
          `,
        });
        return authorsResponse.users.edges;
      } catch (e) {
        console.log(e);
        throw Error("Failed to fetch authors params");
      }
    default:
      return null;
  }
}

export async function getAllNews({ count = 1000 }: { count?: number }) {
  try {
    const data = await fetchAPI({
      query: allNewsQuery(),
      variables: {
        first: count,
      },
    });
    return data?.nyheter as { edges: { node: News }[] };
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch all news previews");
  }
}

export async function getMenuById({ id }: { id: string }) {
  try {
    const data = await fetchAPI({
      query: menuByIdQuery(),
      variables: { id },
    });
    const menu = {
      ...data?.menu,
      menuItems: {
        edges: data?.menu.menuItems.edges.filter(({ node }) => !node.parentId),
      },
    };
    return menu as Menu;
  } catch (e) {
    console.log(e);
    throw Error(`Failed to fetch menu by id: ${id}`);
  }
}

export async function getSitemapPosts() {
  try {
    const data = await fetchAPI({
      query: sitemapPostsQuery(),
    });
    return data?.posts as { edges: { node: Post }[] };
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch sitemap posts");
  }
}

export async function getSitemapPages() {
  try {
    const data = await fetchAPI({
      query: sitemapPagesQuery(),
    });
    return data?.pages as { edges: { node: Page }[] };
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch sitemap pages");
  }
}

export async function getSitemapGuides() {
  try {
    const data = await fetchAPI({
      query: sitemapGuidesQuery(),
    });
    return data?.guider as { edges: { node: Guide }[] };
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch sitemap guides");
  }
}

export async function getSitemapNews() {
  try {
    const data = await fetchAPI({
      query: sitemapNewsQuery(),
    });
    return data?.nyheter as { edges: { node: News }[] };
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch sitemap news");
  }
}

export async function getSitemapSlots() {
  try {
    const data = await fetchAPI({
      query: sitemapSlotsQuery(),
    });
    return data?.slots as { edges: { node: Slot }[] };
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch sitemap slots");
  }
}

export async function getSitemapAuthors() {
  try {
    const data = await fetchAPI({
      query: sitemapAuthorsQuery(),
    });
    return data?.users as { edges: { node: User }[] };
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch sitemap authors");
  }
}

export async function getYoutubeMetaData({ url }: { url: string }) {
  if (!url) return null;
  const searchParams = new URL(url).searchParams;
  const videoId = searchParams.get("v");
  try {
    const request = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,localizations,topicDetails&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`,
    );
    const response = await request.json();
    return response.items[0] ?? null;
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch youtube metadata");
  }
}

export async function getVimeoMetaData({ url }: { url: string }) {
  if (!url) return null;
  const videoId = removeFirstSlash(new URL(url).pathname);
  try {
    const request = await fetch(`https://api.vimeo.com/videos/${videoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VIMEO_API_KEY}`,
      },
    });
    return (await request.json()) ?? null;
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch vimeo metadata");
  }
}

export const getSearchData = async () => {
  try {
    return fetchAPI({
      query: searchQuery(),
    });
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch search data");
  }
};
