import { NextResponse as res } from "next/server"

export async function GET(req, {params}) {
  const wurd = params.wurd

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wurd}`)
    const data = await response.json()

    let returnJSON = {
      'homonym': data.length > 1 ? true : false,
      'data': []
    }

    data.forEach((wordEl, index) => {
      returnJSON.data.push({
        'word': wordEl.word,
        'phonetic': '',
        'meanings': {}
      })

      wordEl.phonetics.forEach(el => {
        if('text' in el && returnJSON.data[index].phonetic == '') {
          returnJSON.data[index].phonetic = el.text
        }
      });
    })

    return res.json(returnJSON)
  } catch {
    return res.json({error: 'err'})
  }
  
}