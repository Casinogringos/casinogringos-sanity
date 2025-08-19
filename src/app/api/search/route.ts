import { getSearchPagePreviews } from "@/src/lib/api"
import { NextResponse } from "next/server"

export async function GET() {
    const allSearchPagePreviews = await getSearchPagePreviews()
    return NextResponse.json(allSearchPagePreviews)
}