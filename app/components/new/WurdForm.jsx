import { useState, useEffect } from "react"
import { useAtom } from "jotai"
import { motion } from "framer-motion"

import { word, newWord, wordData, newWordData, globalLoading } from "@/app/store/myatoms.js"
import { useWurdSub } from "@/app/hooks/useWurdSub.js"
import { SearchBar } from "@/app/components/SearchBar.jsx"
import { PartsOfSpeech } from "@/app/components/new/PartsOfSpeech.jsx"
import { TextCarousel } from "@/app/components/Decoration/TextCarouself.jsx"
import { ErrorMsg } from "@/app/components/new/WurdNotFound.jsx"
import { useCommitWord } from "@/app/hooks/useThisWord.js"
import { Wload } from "@/app/components/Decoration/Loading.jsx"

function Display ({ data }) {
  if (!data) return (<></>)
  
  if (data.title) {
    return(
      <>
        <ErrorMsg />
      </>
    )
  }

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
    <div className="mt-5 mx-0 md:mx-16 p-2 lg:pd-0 w-svh">

      <motion.div 
        layout
        className="lg:mx-16 text-center lg:text-left"

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
      
      </motion.div>

      <div className="lg:mx-16 mx-0">
        <PartsOfSpeech parts={data} />
      </div>

      <div className="flex">

      </div>

    </div>
  )
}

export function WurdInfoDisplay() {
  const [ wurd ] = useAtom(word)
  const [, setWurd ] = useAtom(newWord)
  
  const [ randomWords, setRandomWords] = useState([])
  const [ data ] = useAtom(wordData)
  const [ , setData ] = useAtom(newWordData)

  const { wurdSub } = useWurdSub()
  const commitWord = useCommitWord()

  const [ loading ] = useAtom(globalLoading)

  useEffect(()=>{
    fetch("api/wurd?quant=5", {cache: "reload"})
      .then((res) => res.json())
      .then((data) => {
        setRandomWords(data)
      })
  }, [])

  return (<>
    {console.log(wurd)}
    <div className="h-svh w-svh">
      <div className="h-1/6 font-Cedarville">
        <TextCarousel text={randomWords} />
      </div>

      <div className="flex justify-center">
        <form onSubmit={(event) => {event.preventDefault(); wurdSub(); commitWord()}}>
          <SearchBar
            style="rounded-3xl" 
            wurdUpdate={ (word) => { setWurd(word); }}
          />
        </form>
      </div>



      {/* -> for end Anim: <AnimatePresence>
        { loading
          ? <div className="absolute w-full z-50"><div className="text-5xl flex justify-center pt-20">
              <Wload />
            </div>
            </div>
          : null
        }
      </AnimatePresence>
      { !loading ? <Display data={data}/> : null } */}

      {
        !loading
        ? <Display data={data}/>
        : <div className="text-5xl flex justify-center pt-20">
            <Wload />
          </div>
      }

    </div>
  </>)
}