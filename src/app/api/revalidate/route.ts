import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { operationName, variables } = body || {}
  if (!operationName)
    return NextResponse.json({
      success: false,
      error: 'No operationName provided',
    })
  const tag = `${operationName} ${JSON.stringify(variables)}`
  revalidateTag(tag)
  return NextResponse.json({ success: true })
}
