'use client'

import { SearchBar } from "./SearchBar.jsx"
import { PartsOfSpeech } from "./PartsOfSpeech.jsx"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

function Display ({ data }) {
  if (!data) return (<></>)

  const [ index, setIndex ] = useState(0)

  const wurdVariants = {
    init: {
      y: -40,
      opacity: 0
    },

    loadin: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      }
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
    <div className="ml-0 sm:ml-16 mr-0 sm:mr-16 mt-5 w-svh">

      <motion.div 
        layout
        className="sm:ml-16 text-center sm:text-left"

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
          className="mt-2 text-lg italic" 
          
          key={data.phonetic} 
          variants={proVariants}
        >
          {data.phonetic}
        </motion.div>

        <div classame="flex" cassName="w-40 h-20 flex justify-center items-center text-sky-200 border-2 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
          <PartsOfSpeech parts={data} />
        </div>

      </motion.div>

      <div className="flex">

      </div>

    </div>
  )
}

export function WurdInfoDisplay() {
  const [i, setI] = useState(0)
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
    // finally {
    //   console.log(data)
    // }

  }

  return (
    <>
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
    </>
  )
}