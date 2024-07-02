'use client'

import { SearchBar } from "./SearchBar.jsx"
import { PartsOfSpeech } from "./PartsOfSpeech.jsx"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

function Display ({ data }) {
  if (!data) return (<></>)

  const wurdVariants = {
    init: {
      y: -40,
      opacity: 0
    },

    loadin: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, }
    }
  } 
  const proVariants = {
    init: {
      x: -40,
      opacity: 0
    },

    loadin: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
      }
    }
  }

  return (
    <div className="mx-0 p-2 md:pd-0 md:mx-16 mt-5 w-svh">

      <motion.div 
        layout
        className="md:mx-16 text-center md:text-left"

        initial="init"
        animate="loadin"
      >
        {/* { isHomonym && 
          <motion.span 
            className="text-sm italic text-gray-400 cursor-help"

            key={data.phonetic} 
            variants={proVariants}
          >
            homonym
          </motion.span> 
        } */}
        <motion.div 
          layout
          className="ml-0 text-7xl text-white wurd"
          
          key={data.word}
          variants={wurdVariants}
        >
          {data.word}
          {/* { isHomonym && <span className="ml-3 text-sm italic cursor-help">h</span> }  */}
        </motion.div>

        <motion.div 
          layout 
          className="mt-2 text-lg italic font-extralight" 
          
          key={data.phonetic} 
          variants={proVariants}
        >
          {data.phonetic}
        </motion.div>

        <div>
          <PartsOfSpeech parts={data} />
        </div>

      </motion.div>

      <div className="flex">

      </div>

    </div>
  )
}

export function WurdInfoDisplay() {
  const [ wurd, setWurd] = useState('')
  const [ data, setData ] = useState(null)

  const wurdSub = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(`/api/wurd/${wurd}`)
      const data = await response.json()

      setData(data)
    } catch {
      setData({'Error': 'Ignorant API response'})
    } 
  }

  return (<>
    <div className="h-svh w-svh">
      <div className="h-1/5"></div>

      <div className="flex justify-center">
        <form onSubmit={wurdSub}>
          <SearchBar
            style="rounded-3xl" 
            wurdUpdate={ (word) => setWurd(word) }
          />
        </form>
      </div>

      <Display data={data}/>

    </div>
  </>)
}