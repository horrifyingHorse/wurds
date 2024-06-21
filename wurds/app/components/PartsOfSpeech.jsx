'use client'

import { useState, useEffect, } from "react"

function decToRoman (num) {
  if (num >= 1 && num <= 3) return "I".repeat(num)
  if (num == 4) return "IV"
  if (num == 5) return "V"
  if (num == 6) return "V"

  return NaN
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

export function PartsOfSpeech ({ parts }) {
  const isHomonym = parts.homonym
  const keys = Object.keys(parts.data)
  const [ tab, setTab ] = useState(keys[0])

  useEffect (() => {
    setTab(keys[0]);
  }, [parts])

  return (
  <>
    <div className="flex"> {
      keys.map(txt => 
        <GlowText text={txt} index={txt} func={(i) => setTab(i)}/>
      )
    } </div>
    
    <div className="flex">
      Tab {tab} : {parts.data[tab] ? parts.data[tab][0]['definitions'][0]['definition'] : setTab(keys[0])}
    </div>
  </>
  )
}