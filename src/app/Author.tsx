// import Date from "../../../casinogringos-v3/src/components/Date";
// import InternalLink from "../../../casinogringos-v3/src/components/InternalLink";
// import { Linkedin, Mail } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import BreadCrumbs from "../../../casinogringos-v3/src/components/BreadCrumbs";
// import Container from "../../../casinogringos-v3/src/components/Container";
// import { replaceInternalLinkBaseUrls } from "../lib/helpers";
//
// export default function AuthorSinglePage({ author }) {
//   const breadcrumbs = [
//     {},
//     {
//       text: "Om Oss",
//       url: `${process.env.SITE_URL}/om-oss`,
//     },
//     {
//       text: author?.name,
//       url: `${process.env.SITE_URL}/om-oss/${author?.slug}`,
//     },
//   ];
//
//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: replaceInternalLinkBaseUrls(author?.seo?.schema?.raw),
//         }}
//         key="homepage-data"
//       />
//       <div className="bg-blue50 py-6 lg:py-16">
//         <Container>
//           <div className="flex flex-col items-start gap-10 lg:flex-row">
//             <div className="overflow-hidden rounded-full lg:w-1/5">
//               <Image
//                 className="w-full"
//                 src={author?.avatar?.url}
//                 width={400}
//                 height={400}
//                 alt={author?.name}
//               />
//             </div>
//             <div className="lg:w-3/4">
//               <h1 className="mb-1 text-3xl font-bold">{author?.name}</h1>
//               <span className="text-slate-600">{author?.userType?.role}</span>
//               <div className="ml-auto mt-2 flex gap-2">
//                 {author?.seo?.social?.linkedIn && (
//                   <Link
//                     className="rounded-md bg-dark p-1 text-white"
//                     href={author?.seo?.social?.linkedIn}
//                     title="LinkedIn"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <Linkedin className="h-4 w-4" />
//                   </Link>
//                 )}
//                 {author?.userType?.email && (
//                   <Link
//                     className="rounded-md bg-dark p-1 text-white"
//                     href={`mailto:${author?.userType?.email}`}
//                     title="E-post"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <Mail className="h-4 w-4" />
//                   </Link>
//                 )}
//               </div>
//               <p className="text-slate-700 mt-6">{author?.description}</p>
//               {author?.userType?.expertise && (
//                 <section>
//                   <h3 className="mb-4 mt-5 text-lg">Expertområden</h3>
//                   <div className="flex gap-2 rounded-md">
//                     {author?.userType?.expertise?.map((item, index) => (
//                       <span
//                         key={`author-${author.id}-expertise-${index}`}
//                         className="rounded-sm bg-dark px-2 py-1 text-sm text-white"
//                       >
//                         {item.title}
//                       </span>
//                     ))}
//                   </div>
//                 </section>
//               )}
//               {author?.userType?.experience && (
//                 <section>
//                   <h3 className="mb-3 mt-5 text-lg">
//                     Erfarenhet och utbildning
//                   </h3>
//                   <ul>
//                     {author?.userType?.experience?.map((item, index) => (
//                       <li
//                         key={`author-${author.id}-experience-${index}`}
//                         className="border-b border-b-blue100 py-2"
//                       >
//                         <strong className="text-dark">{item.title}</strong>
//                         <span className="block text-sm">{item.years}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </section>
//               )}
//             </div>
//           </div>
//         </Container>
//       </div>
//       {breadcrumbs && <BreadCrumbs items={breadcrumbs} />}
//       <Container>
//         <div className="prose mx-auto max-w-6xl pb-12">
//           <section>
//             <h2 className="my-10 text-3xl">
//               Artiklar som författaren bidgragit till
//             </h2>
//             {/* <h3 className="mb-4 text-2xl">Senaste artiklar och recensioner</h3> */}
//             <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
//               {author?.posts?.nodes.map((item, index) => (
//                 <InternalLink
//                   key={`author-${author.id}-post-${index}`}
//                   className="font-medium no-underline"
//                   href={item?.uri}
//                   prefetch={false}
//                 >
//                   <Image
//                     src={item?.featuredImage?.node?.sourceUrl}
//                     width={600}
//                     height={350}
//                     alt={item?.title}
//                     className="h-32 w-full rounded-sm object-cover lg:h-36"
//                   />
//                   <div>
//                     <h3 className="mb-1 mt-3 text-lg">{item?.title}</h3>
//                     <span className="block text-xs text-slate600">
//                       <Date dateString={item.date} />
//                     </span>
//                   </div>
//                 </InternalLink>
//               ))}
//             </div>
//           </section>
//           {/* <section>
//             <h2 className="mb-4 text-2xl">Senaste sidor</h2>
//             <ul>
//               {author?.pages?.nodes.map((item) => (
//                 <li key={`author-${item.id}`}>
//                   <InternalLink
//                     className="decoration-transparent font-medium"
//                     href={item?.uri}
//                     prefetch={false}
//                   >
//                     {item?.title}
//                   </InternalLink>
//                 </li>
//               ))}
//             </ul>
//           </section> */}
//         </div>
//       </Container>
//     </>
//   );
// }
