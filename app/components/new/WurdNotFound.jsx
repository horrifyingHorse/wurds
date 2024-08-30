import { useAtom } from "jotai";
import { useState, useEffect } from "react";

import { wordCommit } from "@/app/store/myatoms";
import { useCommitWord, useThisWord } from "@/app/hooks/useThisWord";
import { Wload } from "@/app/components/Decoration/Loading";

export function ErrorMsg() {
  const [ wurd ] = useAtom(wordCommit)
  const [ simWurd, setSimWurd ] = useState('')
  const [ loading, setLoading ] = useState(true)
  const { newWurdClicked } = useThisWord()
  const  commitWord = useCommitWord()

  useEffect(() => {
    setLoading(true)
    fetch(`api/wurd?simto=${wurd}`)
    .then((r) => r.json())
    .then((data) => {
      if (data.error)
        setSimWurd([])
      else
        setSimWurd(data)
      setLoading(false)
    })
    .catch((error) => {
      console.error('Error fetching similar words:', error)
      setSimWurd([])
      setLoading(false)
    });
  }, [wurd])

  console.log("Similar wors: ", simWurd)
  
  return (
    <div className="w-full flex justify-center p-10">
      <div>
        <div className="font-Dosis mb-5">
          <span className="text-7xl">{wurd.toLowerCase()}</span> <span className="font-Dosis">NOT FOUND</span>
        </div>

        Did you mean?
        <div className="ml-9">
        {/* for end anim:  <AnimatePresence>
          { loading
          ? <div className="absolute z-50"><div className="text-5xl flex justify-center pt-20">
                <Wload />
              </div>
            </div>
            : null
          }
        </AnimatePresence>
        { loading 
          ? null */}
        { loading 
          ? <div className="text-5xl flex justify-center pt-20">
              <Wload />
            </div>
          : simWurd.map((el, index) => {
              if (el.score < 100 || index > 4) return(null)
                
              return (
               <div> 
                <span 
                  className="text-blue-600 hover:text-purple-600 transition-all underline cursor-pointer"
                  onClick={() => {
                    commitWord(el.word)
                    newWurdClicked(el.word)
                  }}
                >
                  {el.word}
                </span>
               </div>
              )
            })
        }
        </div>
      </div>
    </div>
  )
}