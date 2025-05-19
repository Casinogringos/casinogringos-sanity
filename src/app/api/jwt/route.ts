import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { secretKey } = await req.json()
  if (secretKey !== process.env.JWT_SECRET_KEY) {
    return NextResponse.json({ status: 'Invalid secret key' })
  }
  const token = await jwt.sign(
    { user: 'jamie' },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: '1h',
    }
  )
  return NextResponse.json({ token })
}
