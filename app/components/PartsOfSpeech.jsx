'use client'

import { useState, useEffect, } from "react"
import { GlowButton } from "./GlowButton.jsx"
import { motion, AnimatePresence } from "framer-motion"

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
  let wurd = globalWord
  if (ex.indexOf(wurd) == -1)  
    wurd = globalWord.charAt(0).toUpperCase() + globalWord.slice(1)

  const split = ex.split(wurd)

  return ( <>
    { split.map((el , index) => <>
      {el} 
      { index < split.length - 1 && <span className="font-bold italic text-white">{wurd}</span> }
    </> ) }
  </> )
}

function GlowText ({ text, func, index, custStyle }) {
  if (!custStyle) custStyle = "pr-6"

  return(
    <motion.div 
      className={custStyle} 
      onClick={() => {func(index)}}
    >
      <motion.div 
        className={`absolute mx-auto py-4 flex border w-fit blur-md bg-green-300 text-transparent bg-clip-text box-content font-extrabold text-center select-none text-xl`}
      >
        {text}
      </motion.div>
      <motion.span 
        className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center bg-green-300 bg-clip-text font-extrabold text-transparent text-center select-auto text-xl cursor-pointer"
        whileHover={{
          color: "#bbf7d0"
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  )
}

function ExpandDetails ({index, def, alreadyRen, tab}) {
  const [ expand, setExpand ] = useState(false)
  
  useEffect(() => setExpand(false), [def])

  return ( <>
  { expand &&
    <AnimatePresence> 
    <motion.div 
      animate={{
        y: [-30, 0],
        transition: { duration: 0.25 }
      }}
      exit={{
        y: [null, -30],
        transition: { duration: 1 }
      }}
    > 
    { def[index]['definitions'].slice(alreadyRen)
      .map((definition) => 
        <div className="flex text-xl">
          <div className="w-10 text-center text-transparent"></div>

          <div className="mb-5 text-left">
            <div className="flex flex-wrap"> { definition['definition'] } </div>
            { 'example' in definition &&
              <div className="text-gray-400"> 
                <span className='font-extralight'>Example:</span> { <ItaliciseWord ex={definition['example']}  /> }
              </div> }
          </div>
        </div>
        ) } 
    </motion.div>
    </AnimatePresence>
  }

  <div className="flex justify-center mx-9 mb-9 mt-3">
    <GlowButton
      className="w-40 p-2 flex justify-center items-center text-sky-200 border-2 rounded-full border-sky-200 shadow-[0_0_1px_#fff,inset_0_0_1px_#fff,0_0_10px_#08f,0_0_1px_#08f,0_0_10px_#08f] hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]" 
      onClick={() => setExpand(!expand)}
    />
  </div>
  </> )
}

function Definition ({ def, tab, k }) {
  const meanings = def.length
  const maxOnDisplay = meanings == 1 ? 2 : 1

  return ( <> { 
    def.map((el, index) => <> 
      <div className={`${tab == k ? "block" : "hidden"}`}>
        { el['definitions']
          .slice(0, maxOnDisplay)
          .map((definition, subIndex) => <div className="flex text-xl">
            
            <div className="w-10 text-center font-extralight">
              { maxOnDisplay == 1 ? `${index + 1}.` : 
                subIndex == 0 ? '1.' : null }  
            </div>

            <div className="mb-3 text-left">
              { definition['definition'] } 
              { 'example' in definition &&
                <div className="text-gray-400"> 
                  <span className='font-extralight'>Example:</span> { <ItaliciseWord ex={definition['example']}  /> }
                </div> }
            </div>

          </div> )
        } 
      
        <div> { 
          el['definitions'].length > maxOnDisplay 
          ? <ExpandDetails index={index} def={def} alreadyRen={maxOnDisplay} tab={tab}/>
          : null 
        } </div>
      
      </div>
    </> ) 
  } </> )
}

function ExtrasInfo({ def, tab, k }) {
  return (<>
    { def[0].synonyms.length && tab == k ? <div className="mb-6">
      <div className="text-xl font-bold text-violet-300 mb-3 cursor-default">Synonyms:</div>
      <div className="flex flex-wrap justify-center md:justify-start">
        { def[0].synonyms.map(el => 
          <div className="text-center text-sm border-2 border-violet-300 mb-2 mr-1 p-2 rounded-full cursor-pointer hover:border-violet-400 transition">{el}</div> 
        )}
      </div>
    </div> : null }

    { def[0].antonyms.length && tab == k ? <div className="mb-6">
      <div className="text-xl font-bold text-red-300 mb-3 cursor-default">Antonyms:</div>
      <div className="flex flex-wrap justify-center md:justify-start">
        { def[0].antonyms.map(el => 
          <div className="text-center text-sm border-2 border-red-300 mr-1 p-2 rounded-full cursor-pointer hover:border-red-400 transition">{el}</div>
        )}
      </div>
    </div> : null }
  </>)
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
    <div className="flex flex-wrap md:justify-start justify-center"> {
      keys.map(txt => <div>
        <GlowText text={txt} index={txt} func={(i) => setTab(i)}/>
        { tab == txt 
        ? <motion.div layout layoutId="underline" className="h-1 bg-green-200 w-4/5" />
        : null }
      </div> )
    } </div>
    
    <div className="mt-3 block md:space-x-5 md:flex">
      <div className="w-full md:w-3/4">
        { keys.map(k => <Definition def={parts.data[k]} tab={tab} k={k} />) }
      </div>

      <div className="text-center md:text-left w-full md:w-1/4">
        { keys.map(k => <ExtrasInfo def={parts.data[k]} tab={tab} k={k} />) }
      </div>
    </div>
  </> )
}