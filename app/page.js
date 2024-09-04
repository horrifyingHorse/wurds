'use client'

import { useEffect } from "react"
import Link from "next/link"
import { useAnimate, usePresence } from "framer-motion"
import { GradientText } from "./components/Decoration/DynamicTextGradient"

function Rotatin({ txt, transformTxt, gradList }) {
  const [ scope, animate ] = useAnimate()
  const [ isPresent, safeToRemove ] = usePresence()

  useEffect(() => {
    if (!scope) return
    
    if (isPresent) {
      const theLoadAnimOri = async () => {
        animate("#original", 
          { 
            opacity: 1,
            //  opacity: [1, 1, 0.4, 0.3, 0.4, 1, 1],
            // scale: [0, 1, 0]
          },
          { 
            duration: 9,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "loop",
          }
        )
        
        animate("#transform", 
          { 
            opacity: [0, 0, 0, 1, 0, 0, 0],
            // scale: [0, 1, 0]
          },
          { 
            duration: 9,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }
        )
  
      }
      theLoadAnimOri()

      return
    } 
  }, [isPresent])

  return (
    <div  ref={scope} className="flex">
      <div id="original" inital={{opacity: 1}} className="absolute">
        <GradientText txt={txt} gradList={gradList} />
      </div>
      <div id="transform" inital={{opacity: 0}} className="absolute">
        <GradientText txt={transformTxt} gradList={gradList} />
      </div>
      <div className="text-transparent">{txt}</div>
    </div>
  )
}
export default function Home() {
  return (
    <>
    <div className="bg-[url('/Desktop-3(2).svg')] h-screen w-full bg-cover  absolute -z-10" />
    <div className="h-svh w-svw flex flex-col justify-center items-center">
      <div className="font-Bebas flex text-[10rem] select-none">
       W
       <Rotatin txt="u" transformTxt="o" gradList={["#3dff8c", "#00e5db", "#00c1ff", "#008eff", "#8717f9"]} />
       rds
      </div>
      <div className="-mt-10 pb-2 text-lg font-Raleway">
        Because Dictionaries are <span className="text-zinc-400">Archaic</span>
      </div>
      <div className="text-slate-300 text-sm font-Raleway p-1">
      Don't Believe? <Link className="underline hover:no-underline text-zinc-500 bg-neutral-800 p-1 rounded-md hover:bg-neutral-900 hover:text-zinc-300 transition-all" href={"/new"}>
          Check it Out!
          </Link>
      </div>
    </div>
    </>
  )
}