import { useState, useEffect, } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { GlowButton } from "@/app/components/Decoration/GlowButton.jsx"
import { useThisWord, useCommitWord } from "@/app/hooks/useThisWord.js"

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

  return ( 
    <>
      { split.map((el , index) => <>
        {el} 
        { index < split.length - 1 && <span className="font-bold italic text-white">{wurd}</span> }
        </> ) }
    </> 
  )
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
    )} 
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

function DefinitionItem({item, mx, indx, subIndx}) {
  return (
    <div className="flex text-xl">
                  
      <div className="w-10 text-center font-extralight">
        { Number(mx) == 1 ? `${Number(indx) + 1}.` : 
          Number(subIndx) == 0 ? '1.' : null }  
      </div>

      <div className="mb-3 text-left">
        { item['definition'] } 
        { 'example' in item &&
          <div className="text-gray-400"> 
            <span className='font-extralight'>Example:&nbsp;</span> 
            { <ItaliciseWord ex={item['example']} /> }
          </div> }
      </div>
    </div>
  )
}

function Definition ({ def, tab, k }) {
  const meanings = def.length
  const maxOnDisplay = meanings == 1 ? 2 : 1

  return ( <> 
    { def.map((el, index) => 
      <div className={`${tab == k ? "block" : "hidden"}`}>
        { el['definitions']
          .slice(0, maxOnDisplay)
          .map((definition, subIndex) => 
            <DefinitionItem item={definition} mx={maxOnDisplay} subIndx={subIndex} indx={index}/>
          )
        } 
      
        <div> { 
          el['definitions'].length > maxOnDisplay 
          ? <ExpandDetails index={index} def={def} alreadyRen={maxOnDisplay} tab={tab}/>
          : null 
        } </div>
      
      </div>
    )}
  </> )
}

function ExtrasInfo({ def, tab, k, nwc}) {
  const commitWord = useCommitWord()

  const variantsCSS = {
    wrap1: "text-xl font-bold mb-3 cursor-default",
    wrap2: "flex flex-wrap justify-center lg:justify-start",
    wrap3: "text-center text-sm border-2 mb-2 mr-1 p-2 rounded-full cursor-pointer transition"
  }

  const synonymCSS = {
    color: "text-violet-300",
    border: "border-violet-300 hover:border-violet-400"
  }

  const antonymCSS = {
    color: "text-red-300",
    border: "border-red-300 hover:border-red-400"
  }

  return (
    <div className="flex flex-wrap lg:flex-col sm:flex-row flex-col justify-center">
      { def[0].synonyms.length && tab == k 
        ? <div className="mb-6 w-full sm:w-1/2 lg:w-full">
            <div className={`${synonymCSS.color} ${variantsCSS.wrap1}`}>Synonyms:</div>
            <div className={`${variantsCSS.wrap2}`}>
              { def[0].synonyms.map(el => 
                <div 
                  className={`${variantsCSS.wrap3} ${synonymCSS.border}`}
                  onClick={() => {nwc(el); commitWord(el)}}
                >
                  {el}
                </div> 
              )}
            </div>
          </div> 

        : null 
      }

      { def[0].antonyms.length && tab == k 
        ? <div className="mb-6 w-full sm:w-1/2 lg:w-full">
            <div className={`${antonymCSS.color} ${variantsCSS.wrap1}`}>Antonyms:</div>
            <div className={`${variantsCSS.wrap2}`}>
              { def[0].antonyms.map(el => 
                <div 
                  className={`${variantsCSS.wrap3} ${antonymCSS.border}`}
                  onClick={() => nwc(el)}
                >
                  {el}
                </div>
              )}
            </div>
          </div> 

        : null 
      }
    </div>
  )
}


export function PartsOfSpeech ({ parts }) {
  const isHomonym = parts.homonym
  const keys = Object.keys(parts.data)
  const [ tab, setTab ] = useState(keys[0])
  const { newWurdClicked } = useThisWord()

  globalWord = parts.word

  useEffect (() => {
    setTab(keys[0]);
  }, [parts])

  return ( 
    <>
      <div className="flex flex-wrap md:justify-start justify-center sticky top-0 z-10 bg-black ml-10 lg:ml-0"> {
        keys.map(txt => 
          <div>
            <GlowText text={txt} index={txt} func={(i) => setTab(i)}/>
            { tab == txt 
              ? <motion.div layout layoutId="underline" className="h-1 bg-green-200 w-4/5" />
              : null }
          </div> 
        )
      } </div>
      
      <div className="mt-3 block lg:space-x-5 lg:flex ml-0 md:ml-10 lg:ml-0">
        <div className="w-full lg:w-3/4">
          { keys.map(k => <Definition def={parts.data[k]} tab={tab} k={k} />) }
        </div>

        <div className="px-10 sm:px-14 lg:px-0 text-center lg:text-left w-full lg:w-1/4">
          { keys.map(k => 
            <ExtrasInfo 
              def={parts.data[k]} 
              tab={tab} 
              k={k} 
              nwc={newWurdClicked}
            />

          ) }
        </div>
      </div>
    </> 
  )
}