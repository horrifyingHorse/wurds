import { useEffect } from "react"
import { useAnimate, usePresence } from "framer-motion"

export function Wload() {
  const [ scope, animate ] = useAnimate()
  const [ isPresent, safeToRemove ] = usePresence()
  const revolvingItems = 4
  const originTransformation = "-35px 25px"
  
  let i = -60

  useEffect(() => {
    if (!scope) return
    
    if (isPresent) {
      const theLoadAnim = async () => {
        await animate("#rotate", { opacity: [0, 1], scale: [0, 1] }, {duration: 0.3, type: "spring"})
        animate("span", {opacity: 1})
  
        for (let item = 1; item < revolvingItems + 1; item++) {
          animate(`#revolve${item}`, 
            {
              rotate: i
            },
            {
              delay: (0.04) * Math.floor((i - 89) / 89),
              duration: 0.7, //+ (0.04) * Math.floor((i - 89) / 89),
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeIn" // [0, 0, 1, 1]
            }
          )
          i = i - 89
        }
  
        animate("#rotate", 
          {
            scale: [1, 1.2, 1, 1],
            rotate: [0, 0, 0, 360],
          }, 
          {
            duration: 1,
            // times: [0.2, 0.2, 0.2, 0.4],
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0.4
          }
        )
        
      }
      theLoadAnim()

      return
    }

    const endAnim = async () => {
      await animate("span", 
        {
          rotate: [null, 0]
        },
        {
          duration: 0.1
        }
      )
      await animate("#rotate", {rotate: [null, 0]}, {duration: 0.1})
      await animate (scope.current, 
        {
          opacity: 0,
          scale: 0.1
        },
        {
          duration: 0.1,
        }
      )
      safeToRemove()
    }
    endAnim()

  }, [isPresent])

  return (
    <div ref={scope} className="flex font-extrabold select-none">  
      <div id="rotate" className="mr-2">
        W
      </div>
      <div>
        <span className="absolute" id="revolve1" initial={{opacity: 0}} style={{ transformOrigin: originTransformation  }}>
          .
        </span>
        <span className="absolute" id="revolve2" initial={{opacity: 0}} style={{ transformOrigin: originTransformation }}>
          .
        </span>
        <span className="absolute" id="revolve3" initial={{opacity: 0}} style={{ transformOrigin: originTransformation }}>
          .
        </span>  
        <span className="absolute" id="revolve4" initial={{opacity: 0}} style={{ transformOrigin: originTransformation }}>
        .
        </span>    
      </div>
    </div>
  )
}