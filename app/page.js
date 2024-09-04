'use client'

import { useEffect } from "react"
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
            duration: 19,
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
    <div className="h-svh w-svw flex justify-center items-center">
      <div className="font-Bebas flex text-[10rem] select-none">
       W
       <Rotatin txt="u" transformTxt="o" gradList={["#3dff8c", "#00e5db", "#00c1ff", "#008eff", "#8717f9"]} />
       rds
      </div>
    </div>
    </>
  )
}