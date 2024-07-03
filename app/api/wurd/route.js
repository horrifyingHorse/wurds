import { NextResponse as res } from "next/server"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const quant = Number(searchParams.get('quant'))

  const externalAPIresp = await fetch(`https://random-word-api.vercel.app/api?words=${quant}`)

  return res.json(await externalAPIresp.json())
}