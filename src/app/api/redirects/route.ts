// import { NextResponse } from 'next/server'
// import { removeFirstSlash } from '@/lib/helpers'
// import jwt from 'jsonwebtoken'
// import { headers } from 'next/headers'
// import { revalidateTag } from 'next/cache'
//
// type Redirect = Record<
//   string,
//   {
//     destination: string
//     type: number
//   }
// >
//
// const getRedirects = async () => {
//   revalidateTag('redirects')
//   const request = await fetch(
//     `https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG_ID}/items?teamId=${process.env.VERCEL_TEAM_ID}`,
//     {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
//       },
//       next: { revalidate: 0, tags: ['redirects'] },
//     }
//   )
//   const response = (await request.json()) as {
//     key: string
//     value: Redirect[]
//   }[]
//   const { value } = response.find((item) => item.key === 'redirects') || {}
//   return value
// }
//
// export async function GET() {
//   const redirects = await getRedirects()
//   const redirectsArray = Object.entries(redirects as Redirect[]).map(
//     ([key, value]) => {
//       return { origin: key, ...value }
//     }
//   )
//   return NextResponse.json(redirectsArray.reverse())
// }
// export async function PUT(req) {
//   const headersList = await headers()
//   const token = headersList.get('Authorization')?.split(' ')[1]
//   if (!token) return NextResponse.json({ message: 'Invalid Token' })
//   let isVerified = false
//   try {
//     await jwt.verify(token, process.env.JWT_SECRET_KEY as string)
//     isVerified = true
//   } catch (err) {
//     console.log(err)
//     isVerified = false
//   }
//   if (!isVerified) return NextResponse.json({ message: 'Invalid Token' })
//   const body = await req.json()
//   const { key, origin, destination, type } = body
//   const redirects = (await getRedirects()) as Redirect[]
//   delete redirects[removeFirstSlash(key)]
//   redirects[removeFirstSlash(origin)] = {
//     destination: destination,
//     type,
//   }
//   const response = await fetch(
//     `https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG_ID}/items?teamId=${process.env.VERCEL_TEAM_ID}`,
//     {
//       method: 'PATCH',
//       headers: {
//         Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         items: [
//           {
//             operation: 'update',
//             key: 'redirects',
//             value: redirects,
//           },
//         ],
//       }),
//     }
//   )
//   const { status } = await response.json()
//   return NextResponse.json({ status })
// }
//
// export async function DELETE(req) {
//   const headersList = await headers()
//   const token = headersList.get('Authorization')?.split(' ')[1]
//   if (!token) return NextResponse.json({ message: 'Invalid Token' })
//   let isVerified = false
//   try {
//     jwt.verify(token, process.env.JWT_SECRET_KEY as string)
//     isVerified = true
//   } catch (err) {
//     console.log(err)
//     isVerified = false
//   }
//   if (!isVerified) return NextResponse.json({ message: 'Invalid Token' })
//   const body = await req.json()
//   const { key } = body
//   const redirects = (await getRedirects()) as Redirect[]
//   delete redirects[removeFirstSlash(key)]
//   const response = await fetch(
//     `https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG_ID}/items?teamId=${process.env.VERCEL_TEAM_ID}`,
//     {
//       method: 'PATCH',
//       headers: {
//         Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         items: [
//           {
//             operation: 'update',
//             key: 'redirects',
//             value: redirects,
//           },
//         ],
//       }),
//     }
//   )
//   const { status } = await response.json()
//   return NextResponse.json({ status })
// }
//
// // export const revalidate = 0
// export const fetchCache = 'force-no-store'
// export const dynamic = 'force-dynamic'
