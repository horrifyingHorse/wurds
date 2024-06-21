'use client'

import { useState } from "react"

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

export function PartsOfSpeech ({ parts, func}) {
  const isHomonym = parts.homonym
  const [ homonym, setHomonym ] = useState(0)

  return (
    <>
      { isHomonym && 
        <div className="flex"> {
          parts.data.map((el, index) => 
            <GlowText 
              text={decToRoman(index + 1)}
              func={(i) => setHomonym(i)}
              index={index}
              custStyle="w-20 mx-2 flex justify-center cursor-pointer"
            />)
      } </div> } 

      <div className="flex"> {
        parts.data.map((el, index) => el.meanings.map((part, childIndex) => 
          <GlowText text={part.partOfSpeech} func={func}/>
        ))
      } </div>
      
      <div className="flex">
        huh?  {homonym}
      </div>
    </>
  )
}