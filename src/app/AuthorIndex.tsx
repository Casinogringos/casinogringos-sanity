// import Container from "../../../casinogringos-v3/src/components/Container";
// import Image from "next/image";
// import Link from "next/link";
//
// export default function AuthorIndex({ authors }) {
//   return (
//     <Container>
//       <div className="py-12">
//         <h1 className="text-3xl font-bold">Skribenter</h1>
//         <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
//           {authors.edges.map((author) => (
//             <article
//               key={`author-${author.node.id}`}
//               className="flex flex-col items-start justify-between"
//             >
//               <div className="relative flex h-40 w-full items-center overflow-hidden rounded-sm">
//                 <Image
//                   src={author?.node?.avatar?.url}
//                   width={author?.node?.avatar?.width}
//                   height={author?.node?.avatar?.height}
//                   alt={author?.node?.name}
//                 />
//               </div>
//               <div className="max-w-xl">
//                 <div className="group relative">
//                   <h3 className="text-gray-900 group-hover:text-gray-600 mt-1 text-lg font-semibold leading-6">
//                     <Link prefetch={false} href={author?.node?.uri}>
//                       <span className="absolute inset-0" />
//                       {author?.node?.name}
//                     </Link>
//                   </h3>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>
//     </Container>
//   );
// }
