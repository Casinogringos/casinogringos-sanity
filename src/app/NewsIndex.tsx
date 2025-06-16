// import Date from '@/src/app/components/atoms/Date'
// import { News } from '@/src/types/index'
// import Link from 'next/link'
// import Container from '@/src/app/components/atoms/Container'
// import SanityImage from '@/src/app/components/atoms/SanityImage'
//
// export default function NewsIndex({ news }: { news: News[] }) {
//   if (!news) {
//     return null
//   }
//   return (
//     <Container className="py-6 lg:py-12">
//       <h1 className="text-3xl font-bold">Casinonyheter</h1>
//       <p className="mt-4 text-lg text-gray600">
//         Här hittar du de senaste nyheterna gällande de nätcasinon som vi listar
//         på våran sida. Vi skriver om allt från nya bonuserbjudanden till vilka
//         kampanjer som för tillfället är aktiva. Nyhetsflödet uppdateras löpande
//         så håll utkik på denna sidan för att inte missa grymma kampanjer.
//       </p>
//       <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-y-10">
//         {news.map((post) => (
//           <div key={`news-${post._key}`} className="flex flex-col items-start">
//             {post.featuredImage && (
//               <div className="relative flex h-32 w-full items-center overflow-hidden rounded-md lg:h-44">
//                 <SanityImage object={post.featuredImage} />
//               </div>
//             )}
//             <div className="mt-3 flex items-center gap-x-4 text-xs">
//               <time dateTime={post.date} className="text-gray500">
//                 <Date dateString={post.date} />
//               </time>
//             </div>
//             <Link href={post.slug.current} prefetch={false}>
//               <h3 className="text-gray-900 group-hover:text-gray-600 mt-1 text-lg font-semibold leading-6">
//                 {post.title}
//               </h3>
//             </Link>
//             {/* <p className="text-gray-600 mt-5 line-clamp-3 text-sm leading-6">{post.description}</p> */}
//           </div>
//         ))}
//       </div>
//     </Container>
//   )
// }
