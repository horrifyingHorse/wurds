import { NextResponse as res } from "next/server"

export async function GET(req, {params}) {
  const wurd = params.wurd

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wurd}`)
    const data = await response.json()

    let returnJSON = {
      'homonym': data.length > 1 ? true : false,
      'word': data[0].word,
      'phonetic': '',
      'data': {}
    }
    
    data.forEach((wordEl) => {
      wordEl.meanings.forEach(el=> {
        if (!(el.partOfSpeech in returnJSON.data)) returnJSON.data[el.partOfSpeech] = []

        let primaryObj = {}
        Object.keys(el)
          .slice(1)
          .forEach( key => primaryObj[key] = el[key] )

        returnJSON.data[el.partOfSpeech].push(primaryObj)
      })

      wordEl.phonetics.forEach(el => {
        if('text' in el && returnJSON.phonetic == '') {
          returnJSON.phonetic = el.text
        }
      });
    })

    return res.json(returnJSON)
  } catch {
    return res.json({error: 'Ignorant API Response'})
  }
  
}