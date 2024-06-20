import { NextResponse as res } from "next/server"

export async function GET(req, {params}) {
  const wurd = params.wurd

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wurd}`)
    const data = await response.json()

    return res.json(data)
  } catch {
    return res.json({error: 'err'})
  }
  
}