// import { getAuthorBySlug, getStaticParams } from "@/lib/api";
// import { notFound } from "next/navigation";
// import Author from "@/src/app/Author";
// import { extractSlugFromUrl } from "@/lib/helpers";
// import { Metadata } from "next";
//
// type Params = Promise<{ slug: string }>;
//
// export async function generateMetadata(props: { params: Params }) {
//   const params = await props.params;
//   const item = await getAuthorBySlug({ slug: params?.slug });
//   if (!item?.seo?.canonical) throw new Error("SEO is missing");
//   const metadata = {
//     title: item?.seo?.title
//       ? item.seo.title
//       : `${item?.name} - ${item?.userType?.role} på Casinogringos.se`,
//     description: item?.seo?.metaDesc,
//     alternates: {
//       canonical:
//         process.env.SITE_URL + extractSlugFromUrl(item?.seo?.canonical),
//     },
//     openGraph: {
//       title: item?.seo?.title,
//       description: item?.seo?.metaDesc,
//       url: item?.seo?.canonical,
//       locale: "sv_SE",
//       images: [
//         {
//           url: item?.avatar?.url,
//           alt: item?.name,
//           width: item?.avatar?.width,
//           height: item?.avatar?.height,
//         },
//       ],
//     },
//   };
//
//   return metadata as Metadata;
// }
//
// export default async function AuthorItem(props: { params: Params }) {
//   const params = await props.params;
//   const user = await getAuthorBySlug({ slug: params?.slug });
//   if (user) {
//     return <Author author={user} />;
//   } else return notFound();
// }
//
// export async function generateStaticParams() {
//   const users = await getStaticParams("author");
//
//   return users.map(({ node }) => ({ slug: node.slug }));
// }
