import { NextResponse as res } from "next/server"

export async function GET(req) {
  const { searchParams } = new URL(req.url)

  const quant = Number(searchParams.get('quant'))
  const simto = String(searchParams.get('simto'))

  let externalAPIresp = ''

  if (quant) {
    externalAPIresp = await fetch(`https://random-word-api.vercel.app/api?words=${quant}`)
  } else if (simto) {
    externalAPIresp = await fetch(`https://api.datamuse.com/words?sp=${simto}`)
  }

  return res.json(externalAPIresp == '' ? {'error': 1} : await externalAPIresp.json())
}