'use client'

import { useState, useEffect, } from "react"
import { GlowButton } from "./GlowButton.jsx"

let globalWord = ''
// background-image: linear-gradient(to right, #a743ff, #925bff, #7e6cff, #6d7aff, #6185ff, #9083f8, #b281f0, #cc81e6, #fa78c2, #ff7c9a, #ff8e75, #ffa65a);

function decToRoman (num) {
  if (num >= 1 && num <= 3) return "I".repeat(num)
  if (num == 4) return "IV"
  if (num == 5) return "V"
  if (num == 6) return "V"

  return NaN
}

function ItaliciseWord({ ex }) {
  if (ex.indexOf(globalWord) == -1)  
    globalWord = globalWord.charAt(0).toUpperCase() + globalWord.slice(1)

  const split = ex.split(globalWord)

  return ( <>
    { split.map((el , index) => <>
      {el} 
      { index < split.length - 1 && <span className="font-bold italic text-white">{globalWord}</span>}
    </> ) }
  </> )
}

function GlowText ({ text, func, index, custStyle }) {
  if (!custStyle) custStyle = "pr-6"

  return(
    <div className={custStyle} onClick={() => {func(index)}}>
      <div className="absolute mx-auto py-4 flex border w-fit blur-md bg-green-300 bg-clip-text box-content font-extrabold text-transparent text-center select-none text-xl">
        {text}
      </div>
      <span 
        className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center bg-green-300 bg-clip-text font-extrabold text-transparent text-center select-auto text-xl cursor-pointer"
      >
        {text}
      </span>
    </div>
  )
}

function Example () {
  const [ ex, setEx ] = useState(0)

  useEffect(() => setEx(-1), [])

  return (<>
    <span onClick={() => setEx(ex + 1)}>Example State{ex}</span>
  </>)
}

function ExpandDetails ({index, def, alreadyRen, tab}) {
  const [ expand, setExpand ] = useState(false)
  
  useEffect(() => setExpand(false), [def])

  return ( <>
  { expand &&
    <div>
      {console.log(def)}
      { def[index]['definitions'].slice(alreadyRen)
        .map((definition) => 
          <div className="flex text-xl mb-3">
            <div className="w-10 text-center font-extralight">
  
            </div>

            <div>
              { definition['definition'] } 
              { 'example' in definition &&
                <div className="text-gray-400"> 
                  <span className='font-extralight'>Example:</span> { <ItaliciseWord ex={definition['example']}  /> }
                </div>
              }
            </div>
          </div>
          )
        } 
    </div>
  }
  <div className="flex justify-center m-9">
    <GlowButton 
      className="w-40 p-2 flex justify-center items-center text-sky-200 border-2 rounded-full border-sky-200 shadow-[0_0_1px_#fff,inset_0_0_1px_#fff,0_0_10px_#08f,0_0_1px_#08f,0_0_10px_#08f] hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]" 
      onClick={() => setExpand(!expand)}
    />
    {/* <button className="p-2 flex justify-center items-center text-sky-200 border-2 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]" onClick={() => setExpand(!expand)}>Expand</button>  */}
  </div>
  </> )
}

function Definition ({ def, tab }) {
  const meanings = def.length
  const maxOnDisplay = meanings == 1 ? 2 : 1

  return ( <>
    { def.map((el, index) => 
    <> 
      <div className=""> {
        el['definitions'].slice(0, maxOnDisplay)
        .map((definition, subIndex) => 
          <div className="flex text-xl mb-3">
            <div className="w-10 text-center font-extralight">
              { maxOnDisplay == 1 ? `${index + 1}.` : 
                subIndex == 0 ? '1.' : <></> }  
            </div>

            <div>
              { definition['definition'] } 
              { 'example' in definition &&
                <div className="text-gray-400"> 
                  <span className='font-extralight'>Example:</span> { <ItaliciseWord ex={definition['example']}  /> }
                </div>
              }
            </div>
          </div>
          )
        } 

        <div> { 
          el['definitions'].length > maxOnDisplay ? 
          <ExpandDetails index={index} def={def} alreadyRen={maxOnDisplay} tab={tab}/>: '' 
        } 
        </div>
      </div> </>
      ) }
  </> )
}

export function PartsOfSpeech ({ parts }) {
  const isHomonym = parts.homonym
  const keys = Object.keys(parts.data)
  const [ tab, setTab ] = useState(keys[0])

  globalWord = parts.word

  useEffect (() => {
    setTab(keys[0]);
  }, [parts])

  return ( <>
    <div className="flex"> {
      keys.map(txt => 
        <GlowText text={txt} index={txt} func={(i) => setTab(i)}/>
      )
    } </div>
    
    <div className="mt-3 flex space-x-5">
      <div className="w-3/4">
        <Definition def={parts.data[tab] ? parts.data[tab] : setTab(keys[0])} tab={tab} />
      </div>
      <div className="w-1/4"></div>
      {/* Tab {tab} : {parts.data[tab] ? parts.data[tab][0]['definitions'][0]['definition'] : setTab(keys[0])} */}
    </div>
  </> )
}