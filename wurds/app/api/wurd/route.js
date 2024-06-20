import { NextResponse as res } from "next/server"

export async function GET(req) {
  const wurd = req.query
  return res.json({'word': wurd})
}